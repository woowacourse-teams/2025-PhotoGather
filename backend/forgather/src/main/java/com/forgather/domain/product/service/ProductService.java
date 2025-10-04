package com.forgather.domain.product.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.forgather.domain.product.dto.RegisterProductPhotoRequest;
import com.forgather.domain.product.dto.RegisterProductRequest;
import com.forgather.domain.product.dto.ProductResponse;
import com.forgather.domain.product.model.Product;
import com.forgather.domain.product.model.ProductPhoto;
import com.forgather.domain.product.repository.ProductPhotoRepository;
import com.forgather.domain.product.repository.ProductRepository;
import com.forgather.domain.space.model.Space;
import com.forgather.domain.space.repository.SpaceRepository;
import com.forgather.global.exception.BaseException;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class ProductService {

    private final ProductRepository productRepository;
    private final ProductPhotoRepository productPhotoRepository;
    private final SpaceRepository spaceRepository;

    @Transactional(readOnly = true)
    public ProductResponse get(String spaceCode) {
        Product product = productRepository.getBySpaceCodeOrThrow(spaceCode);
        List<ProductPhoto> photos = productPhotoRepository.findAllByProduct(product);
        return new ProductResponse(product, photos);
    }

    @Transactional
    public ProductResponse register(String spaceCode, RegisterProductRequest request) {
        Space space = spaceRepository.getByCodeOrThrow(spaceCode);
        validateProductAlreadyExists(spaceCode);
        Product product = request.toEntity(space);
        Product savedProduct = productRepository.save(product);

        int order = 1;
        List<ProductPhoto> savedPhotos = new ArrayList<>();
        for (RegisterProductPhotoRequest photo : request.photos()) {
            ProductPhoto productPhoto = photo.toEntity(savedProduct, order++);
            ProductPhoto savedPhoto = productPhotoRepository.save(productPhoto);
            savedPhotos.add(savedPhoto);
        }
        return new ProductResponse(savedProduct, savedPhotos);
    }

    private void validateProductAlreadyExists(String spaceCode) {
        Optional<Product> optionalProduct = productRepository.findBySpaceCode(spaceCode);
        if (optionalProduct.isPresent()) {
            throw new BaseException("이미 등록된 작품이 존재합니다. spaceCode: " + spaceCode);
        }
    }
}
