package com.forgather.domain.product.service;

import static com.forgather.domain.upload.domain.FilePathGenerator.generateContentsFilePath;
import static com.forgather.domain.upload.domain.UploadCategory.PRODUCT;

import java.util.ArrayList;
import java.util.List;

import org.springframework.context.ApplicationEventPublisher;
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
import com.forgather.domain.upload.event.DeletePhotoEvent;
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

    private final ApplicationEventPublisher eventPublisher;
    private final ProductRepository productRepository;
    private final ProductPhotoRepository productPhotoRepository;
    private final SpaceRepository spaceRepository;
    private final SpaceHostMapRepository spaceHostMapRepository;
    private final ContentsStorage contentsStorage;

    /**
     * TODO 작품 복수 등록 마이그레이션 이후 제거
     */
    @Transactional(readOnly = true)
    public ProductResponse getV2(String spaceCode) {
        Space space = spaceRepository.getByCodeOrThrow(spaceCode);
        Product product = productRepository.getBySpaceOrThrow(space);
        ProductPhotos productPhotos = new ProductPhotos(productPhotoRepository.findAllByProduct(product));
        return new ProductResponse(product, productPhotos.getAll());
    }

    /**
     * 스페이스에 등록된 작품 목록을 조회합니다.
     */
    @Transactional(readOnly = true)
    public ProductsResponse getAll(String spaceCode) {
        Space space = spaceRepository.getByCodeOrThrow(spaceCode);
        List<Product> products = productRepository.findAllBySpace(space);
        List<SimpleProductResponse> productResponses = products.stream()
            .map(product -> new SimpleProductResponse(
                product,
                productPhotoRepository.findFirstByProduct(product).orElse(null))
            ).toList();
        return new ProductsResponse(productResponses);
    }

    @Transactional(readOnly = true)
    public ProductResponse get(String spaceCode, Long productId) {
        Space space = spaceRepository.getByCodeOrThrow(spaceCode);
        Product product = productRepository.getBySpaceAndIdOrThrow(space, productId);
        ProductPhotos productPhotos = new ProductPhotos(productPhotoRepository.findAllByProduct(product));
        return new ProductResponse(product, productPhotos.getAll());
    }

    /**
     * TODO 작품 복수 등록 마이그레이션 이후 제거
     */
    @Transactional
    public ProductResponse register(Host host, String spaceCode, RegisterProductRequest request) {
        Space space = spaceRepository.getByCodeOrThrow(spaceCode);
        validateSpaceHost(host, space);
        validateProductAlreadyExists(space);
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

    /**
     * TODO 작품 복수 등록 마이그레이션 이후 제거
     */
    private void validateProductAlreadyExists(Space space) {
        List<Product> products = productRepository.findAllBySpace(space);
        if (!products.isEmpty()) {
            throw new BaseException("이미 등록된 작품이 존재합니다. spaceCode: " + space.getCode());
        }
    }

    @Transactional
    public ProductResponse registerV3(Host host, String spaceCode, RegisterProductRequest request) {
        Space space = spaceRepository.getByCodeOrThrow(spaceCode);
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
        Long counts = productRepository.countBySpace(space);
        if (counts >= PRODUCTS_MAX_COUNT) {
            throw new BaseException("작품은 3개까지만 등록 가능합니다. spaceCode: " + space.getCode());
        }
    }

    /**
     * TODO 작품 복수 등록 마이그레이션 이후 제거
     */
    @Transactional
    public ProductResponse update(Host host, String spaceCode, UpdateProductRequest request) {
        // Product 정보 수정
        Space space = spaceRepository.getByCodeOrThrow(spaceCode);
        validateSpaceHost(host, space);
        Product product = productRepository.getBySpaceOrThrow(space);
        product.update(request.title(), request.category(), request.authorName(), request.description(),
            request.videoUrl(), request.isVideoAfterPhoto());

        // 삭제 사진 db 및 클라우드 삭제
        ProductPhotos photos = new ProductPhotos(productPhotoRepository.findAllByProduct(product));
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
    public ProductResponse updateV3(Host host, String spaceCode, Long productId, UpdateProductRequest request) {
        // Product 정보 수정
        Space space = spaceRepository.getByCodeOrThrow(spaceCode);
        validateSpaceHost(host, space);
        Product product = productRepository.getBySpaceAndIdOrThrow(space, productId);
        product.update(request.title(), request.category(), request.authorName(), request.description(),
            request.videoUrl(), request.isVideoAfterPhoto());

        // 삭제 사진 db 및 클라우드 삭제
        ProductPhotos photos = new ProductPhotos(productPhotoRepository.findAllByProduct(product));
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
    public void delete(Host host, String spaceCode) {
        Space space = spaceRepository.getByCodeOrThrow(spaceCode);
        validateSpaceHost(host, space);
        Product product = productRepository.getBySpaceOrThrow(space);
        deleteAllProductPhotos(product);
        productRepository.delete(product);
    }

    @Transactional
    public void deleteV2(Host host, String spaceCode, Long productId) {
        Space space = spaceRepository.getByCodeOrThrow(spaceCode);
        validateSpaceHost(host, space);
        Product product = productRepository.getBySpaceAndIdOrThrow(space, productId);
        deleteAllProductPhotos(product);
        productRepository.delete(product);
    }

    /**
     * 스페이스 삭제
     */
    @Transactional
    public void deleteIfExists(Host host, Space space) {
        validateSpaceHost(host, space);
        for (Product product : productRepository.findAllBySpace(space)) {
            deleteAllProductPhotos(product);
            productRepository.delete(product);
        }
    }

    /**
     * product와 연관된 모든 ProductPhoto 삭제
     */
    private void deleteAllProductPhotos(Product product) {
        List<ProductPhoto> photos = productPhotoRepository.findAllByProduct(product);
        if (!photos.isEmpty()) {
            deleteProductPhotos(photos);
        }
    }

    /**
     * productPhotos만 삭제
     */
    private void deleteProductPhotos(List<ProductPhoto> productPhotos) {
        productPhotoRepository.deleteAll(productPhotos);
        eventPublisher.publishEvent(new DeletePhotoEvent(this, productPhotos)); // 클라우드 삭제 이벤트 발행
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
        return spaceHostMapRepository.findBySpaceAndHost(space, host).isPresent();
    }
}
