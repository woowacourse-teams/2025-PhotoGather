package com.forgather.domain.product.dto;

import com.forgather.domain.product.model.ProductPhoto;

public record RegisterProductPhotoResponse(
    Long id,
    String originalName,
    String path,
    int order
) {

    public RegisterProductPhotoResponse(ProductPhoto photo) {
        this(photo.getId(), photo.getOriginalName(), photo.getPath(), photo.getSortOrder());
    }
}
