package com.forgather.fixture;

import static com.forgather.fixture.ProductFixture.createProduct;

import com.forgather.domain.product.model.ProductPhoto;

public class ProductPhotoFixture {

    // TODO Reflection으로 대체
    public static ProductPhoto createProductPhotoSetId(long id) {
        return new ProductPhoto(id, createProduct(), "originalName", "path", 1024L, 1);
    }

    public static ProductPhoto createProductPhotoWithOrder(int order) {
        return new ProductPhoto(createProduct(), "originalName", "path", 1024L, order);
    }

    public static ProductPhoto createProductPhoto() {
        return new ProductPhoto(createProduct(), "originalName", "path", 1024L, 1);
    }
}
