package com.forgather.domain.product.service;

import static com.forgather.domain.upload.domain.FilePathGenerator.generateContentsFilePath;
import static com.forgather.domain.upload.domain.UploadCategory.PRODUCT;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.forgather.domain.product.dto.ProductResponse;
import com.forgather.domain.product.dto.ProductsResponse;
import com.forgather.domain.product.dto.RegisterProductRequest;
import com.forgather.domain.product.dto.SimpleProductResponse;
import com.forgather.domain.product.dto.UpdateProductRequest;
import com.forgather.domain.product.model.Product;
import com.forgather.domain.product.model.ProductPhoto;
import com.forgather.domain.product.model.ProductPhotos;
import com.forgather.domain.product.repository.ProductPhotoRepository;
import com.forgather.domain.product.repository.ProductRepository;
import com.forgather.domain.space.model.Space;
import com.forgather.domain.space.repository.SpaceRepository;
import com.forgather.domain.upload.domain.ContentsStorage;
import com.forgather.global.auth.model.Host;
import com.forgather.global.auth.repository.SpaceHostMapRepository;
import com.forgather.global.exception.BaseException;
import com.forgather.global.exception.BaseNullPointerException;
import com.forgather.global.exception.ForbiddenException;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class ProductService {

    private static final int PRODUCTS_MAX_COUNT = 3;

    private final ProductRepository productRepository;
    private final ProductPhotoRepository productPhotoRepository;
    private final SpaceRepository spaceRepository;
    private final SpaceHostMapRepository spaceHostMapRepository;
    private final ContentsStorage contentsStorage;

    /**
     * 스페이스에 등록된 작품 목록을 조회합니다.
     */
    @Transactional(readOnly = true)
    public ProductsResponse getAll(String spaceCode) {
        Space space = spaceRepository.getByCodeAndDeletedAtIsNullOrThrow(spaceCode);
        List<Product> products = productRepository.findAllBySpaceAndDeletedAtIsNull(space);
        List<SimpleProductResponse> productResponses = products.stream()
            .map(product -> new SimpleProductResponse(
                product,
                productPhotoRepository.findFirstByProductAndDeletedAtIsNull(product).orElse(null))
            ).toList();
        return new ProductsResponse(productResponses);
    }

    @Transactional(readOnly = true)
    public ProductResponse get(String spaceCode, Long productId) {
        Space space = spaceRepository.getByCodeAndDeletedAtIsNullOrThrow(spaceCode);
        Product product = productRepository.getBySpaceAndIdAndDeletedAtIsNullOrThrow(space, productId);
        ProductPhotos productPhotos = new ProductPhotos(productPhotoRepository.findAllByProductAndDeletedAtIsNull(product));
        return new ProductResponse(product, productPhotos.getAll());
    }

    @Transactional
    public ProductResponse register(Host host, String spaceCode, RegisterProductRequest request) {
        Space space = spaceRepository.getByCodeAndDeletedAtIsNullOrThrow(spaceCode);
        validateSpaceHost(host, space);
        validateExceedProductMaxCount(space);
        Product product = productRepository.save(request.toEntity(space));

        ProductPhotos productPhotos = new ProductPhotos();
        for (var photoRequest : request.photos()) { // TODO NPE
            String path = generateContentsFilePath(
                contentsStorage.getRootDirectory(),
                spaceCode,
                PRODUCT,
                photoRequest.uploadFileName()
            );
            productPhotos.add(photoRequest.toEntity(product, path));
        }
        productPhotoRepository.saveAll(productPhotos.getAll());
        return new ProductResponse(product, productPhotos.getAll());
    }

    private void validateExceedProductMaxCount(Space space) {
        Long count = productRepository.countBySpaceAndDeletedAtIsNull(space);
        if (count >= PRODUCTS_MAX_COUNT) {
            throw new BaseException("작품은 3개까지만 등록 가능합니다. spaceCode: " + space.getCode());
        }
    }

    @Transactional
    public ProductResponse update(Host host, String spaceCode, Long productId, UpdateProductRequest request) {
        // Product 정보 수정
        Space space = spaceRepository.getByCodeAndDeletedAtIsNullOrThrow(spaceCode);
        validateSpaceHost(host, space);
        Product product = productRepository.getBySpaceAndIdAndDeletedAtIsNullOrThrow(space, productId);
        product.update(request.title(), request.category(), request.authorName(), request.description(),
            request.videoUrl(), request.isVideoAfterPhoto());

        // 삭제 사진 db 및 클라우드 삭제
        ProductPhotos photos = new ProductPhotos(productPhotoRepository.findAllByProductAndDeletedAtIsNull(product));
        List<ProductPhoto> deletedPhotos = photos.deleteByIds(request.deletePhotoIds());
        deleteProductPhotos(deletedPhotos);

        // 새로운 사진 추가 및 db 저장
        List<ProductPhoto> newPhotos = new ArrayList<>();
        for (var photoRequest : request.newPhotos()) {
            String path = generateContentsFilePath(
                contentsStorage.getRootDirectory(),
                spaceCode,
                PRODUCT,
                photoRequest.uploadFileName()
            );
            newPhotos.add(photoRequest.toEntity(product, path));
        }
        photos.add(newPhotos);
        productPhotoRepository.saveAll(newPhotos);

        return new ProductResponse(product, photos.getAll());
    }

    @Transactional
    public void delete(Host host, String spaceCode, Long productId) {
        Space space = spaceRepository.getByCodeAndDeletedAtIsNullOrThrow(spaceCode);
        validateSpaceHost(host, space);
        Product product = productRepository.getBySpaceAndIdAndDeletedAtIsNullOrThrow(space, productId);
        deleteAllProductPhotos(product);
        product.delete();
    }

    /**
     * 스페이스 삭제
     */
    @Transactional
    public void deleteIfExists(Host host, Space space) {
        validateSpaceHost(host, space);
        for (Product product : productRepository.findAllBySpaceAndDeletedAtIsNull(space)) {
            deleteAllProductPhotos(product);
            product.delete();
        }
    }

    /**
     * product와 연관된 모든 ProductPhoto 삭제
     */
    private void deleteAllProductPhotos(Product product) {
        List<ProductPhoto> photos = productPhotoRepository.findAllByProductAndDeletedAtIsNull(product);
        if (!photos.isEmpty()) {
            deleteProductPhotos(photos);
        }
    }

    /**
     * productPhotos만 삭제
     */
    private void deleteProductPhotos(List<ProductPhoto> productPhotos) {
        for (ProductPhoto productPhoto : productPhotos) {
            productPhoto.delete();
        }
    }

    private void validateSpaceHost(Host host, Space space) {
        if (isSpaceHost(space, host)) {
            return;
        }
        throw new ForbiddenException(
            "해당 스페이스에 대한 접근 권한이 없습니다. spaceCode: %s, hostId: %d".formatted(space.getCode(), host.getId())
        );
    }

    private boolean isSpaceHost(Space space, Host host) {
        if (space == null || host == null) {
            throw new BaseNullPointerException("스페이스와 호스트는 null일 수 없습니다.");
        }
        return spaceHostMapRepository.findBySpaceAndHostAndDeletedAtIsNull(space, host).isPresent();
    }
}
