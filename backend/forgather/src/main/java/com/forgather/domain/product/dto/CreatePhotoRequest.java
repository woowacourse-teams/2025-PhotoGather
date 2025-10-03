package com.forgather.domain.product.dto;

import com.forgather.domain.product.model.Product;
import com.forgather.domain.product.model.ProductPhoto;

public record CreatePhotoRequest(
    String originalName,
    String path,
    long capacity
) {

    public ProductPhoto toEntity(Product product, int sortOrder) {
        return new ProductPhoto(product, originalName, path, capacity, sortOrder);
    }
}
