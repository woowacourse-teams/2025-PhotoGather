package com.forgather.domain.product.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.forgather.domain.product.dto.CreatePhotoRequest;
import com.forgather.domain.product.dto.CreateProductRequest;
import com.forgather.domain.product.dto.CreateProductResponse;
import com.forgather.domain.product.model.Product;
import com.forgather.domain.product.model.ProductPhoto;
import com.forgather.domain.product.repository.ProductPhotoRepository;
import com.forgather.domain.product.repository.ProductRepository;
import com.forgather.domain.space.model.Space;
import com.forgather.domain.space.repository.SpaceRepository;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class ProductService {

    private final ProductRepository productRepository;
    private final ProductPhotoRepository productPhotoRepository;
    private final SpaceRepository spaceRepository;

    @Transactional
    public CreateProductResponse create(String spaceCode, CreateProductRequest request) {
        Space space = spaceRepository.getByCodeOrThrow(spaceCode);
        Product product = request.toEntity(space);
        Product savedProduct = productRepository.save(product);

        int order = 1;
        List<ProductPhoto> savedPhotos = new ArrayList<>();
        for (CreatePhotoRequest photo : request.photos()) {
            ProductPhoto productPhoto = photo.toEntity(savedProduct, order++);
            ProductPhoto savedPhoto = productPhotoRepository.save(productPhoto);
            savedPhotos.add(savedPhoto);
        }
        return new CreateProductResponse(savedProduct, savedPhotos);
    }
}
