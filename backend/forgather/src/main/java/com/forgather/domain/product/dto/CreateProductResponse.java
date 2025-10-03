package com.forgather.domain.product.dto;

import java.util.List;

import com.forgather.domain.product.model.Product;
import com.forgather.domain.product.model.ProductPhoto;

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
