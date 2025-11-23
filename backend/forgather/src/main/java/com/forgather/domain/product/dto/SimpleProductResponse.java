package com.forgather.domain.product.dto;

import com.forgather.domain.product.model.Product;
import com.forgather.domain.product.model.ProductPhoto;

public record SimpleProductResponse(
    Long id,
    String title,
    String category,
    String videoUrl,
    ProductPhotoResponse firstPhoto
) {

    public SimpleProductResponse(Product product, ProductPhoto firstPhoto) {
        this(product.getId(),
            product.getTitle(),
            product.getCategory(),
            product.getVideoUrl(),
            (firstPhoto != null) ? new ProductPhotoResponse(firstPhoto) : null
        );
    }
}
