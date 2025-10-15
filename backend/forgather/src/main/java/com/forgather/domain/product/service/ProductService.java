package com.forgather.domain.product.service;

import static com.forgather.domain.upload.domain.FilePathGenerator.generateContentsFilePath;
import static com.forgather.domain.upload.domain.UploadCategory.PRODUCT;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.context.ApplicationEventPublisher;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.forgather.domain.product.dto.ProductResponse;
import com.forgather.domain.product.dto.RegisterProductRequest;
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
import com.forgather.global.exception.BaseException;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class ProductService {

    private final ApplicationEventPublisher eventPublisher;
    private final ProductRepository productRepository;
    private final ProductPhotoRepository productPhotoRepository;
    private final SpaceRepository spaceRepository;
    private final ContentsStorage contentsStorage;

    @Transactional(readOnly = true)
    public ProductResponse get(String spaceCode) {
        Product product = productRepository.getBySpaceCodeOrThrow(spaceCode);
        ProductPhotos productPhotos = new ProductPhotos(productPhotoRepository.findAllByProduct(product));
        return new ProductResponse(product, productPhotos.getAll());
    }

    @Transactional
    public ProductResponse register(String spaceCode, RegisterProductRequest request) {
        Space space = spaceRepository.getByCodeOrThrow(spaceCode);
        validateProductAlreadyExists(spaceCode);
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

    private void validateProductAlreadyExists(String spaceCode) {
        Optional<Product> optionalProduct = productRepository.findBySpaceCode(spaceCode);
        if (optionalProduct.isPresent()) {
            throw new BaseException("이미 등록된 작품이 존재합니다. spaceCode: " + spaceCode);
        }
    }

    @Transactional
    public ProductResponse update(String spaceCode, UpdateProductRequest request) {
        // Product 정보 수정
        Product product = productRepository.getBySpaceCodeOrThrow(spaceCode);
        product.update(request.title(), request.category(), request.authorName(), request.description());

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
    public void delete(String spaceCode) {
        Product product = productRepository.getBySpaceCodeOrThrow(spaceCode);
        deleteAllProductPhotos(product);
        productRepository.delete(product);
    }

    /**
     * product와 연관된 모든 ProductPhoto 삭제
     */
    private void deleteAllProductPhotos(Product product) {
        List<ProductPhoto> photos = productPhotoRepository.findAllByProduct(product);
        deleteProductPhotos(photos);
    }

    /**
     * productPhotos만 삭제
     */
    private void deleteProductPhotos(List<ProductPhoto> productPhotos) {
        productPhotoRepository.deleteAll(productPhotos);
        eventPublisher.publishEvent(new DeletePhotoEvent(this, productPhotos)); // 클라우드 삭제 이벤트 발행
    }
}
