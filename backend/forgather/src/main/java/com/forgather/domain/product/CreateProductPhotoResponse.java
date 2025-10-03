package com.forgather.domain.product;

public record CreateProductPhotoResponse(
    long id,
    String originalName,
    String path,
    int order
) {

    public CreateProductPhotoResponse(ProductPhoto photo) {
        this(photo.getId(), photo.getOriginalName(), photo.getPath(), photo.getSortOrder());
    }
}
