package com.forgather.domain.product;

import java.util.List;

public record CreateProductResponse(
    String title,
    String category,
    String authorName,
    String description,
    List<CreateProductPhotoResponse> photos
) {

    public CreateProductResponse(Product product, List<ProductPhoto> photos) {
        this(product.getTitle(),
            product.getCategory(),
            product.getAuthorName(),
            product.getDescription(),
            photos.stream().map(CreateProductPhotoResponse::new).toList()
        );
    }
}
