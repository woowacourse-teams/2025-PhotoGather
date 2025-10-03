package com.forgather.domain.product.dto;

import com.forgather.domain.product.model.ProductPhoto;

public record CreateProductPhotoResponse(
    Long id,
    String originalName,
    String path,
    int order
) {

    public CreateProductPhotoResponse(ProductPhoto photo) {
        this(photo.getId(), photo.getOriginalName(), photo.getPath(), photo.getSortOrder());
    }
}
