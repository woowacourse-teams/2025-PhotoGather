package com.forgather.domain.product.dto;

import com.forgather.domain.product.model.Product;
import com.forgather.domain.product.model.ProductPhoto;

public record RegisterProductPhotoRequest(
    String originalName,
    String path,
    Long capacity
) {

    // ProductPhotos.add()가 정렬 순서를 자동 할당하므로, 초기값(1)은 의미 없음
    public ProductPhoto toEntity(Product product) {
        return new ProductPhoto(product, originalName, path, capacity, 1);
    }
}
