package com.forgather.domain.product;

import java.util.List;

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
