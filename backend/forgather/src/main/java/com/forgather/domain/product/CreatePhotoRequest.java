package com.forgather.domain.product;

public record CreatePhotoRequest(
    String originalName,
    long capacity,
    String path
) {

    public ProductPhoto toEntity(Product product, int sortOrder) {
        return new ProductPhoto(product, sortOrder);
    }
}
