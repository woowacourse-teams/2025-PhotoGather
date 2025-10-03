package com.forgather.domain.product.dto;

import java.util.List;

import com.forgather.domain.product.model.Product;
import com.forgather.domain.space.model.Space;

public record CreateProductRequest(
    String title,
    String category,
    String authorName,
    String description,
    List<CreatePhotoRequest> photos
) {

    public Product toEntity(Space space) {
        return new Product(space, title, category, authorName, description);
    }
}
