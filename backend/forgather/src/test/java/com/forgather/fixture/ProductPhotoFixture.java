package com.forgather.fixture;

import static com.forgather.fixture.ProductFixture.createProduct;

import org.springframework.test.util.ReflectionTestUtils;

import com.forgather.domain.product.model.ProductPhoto;

public class ProductPhotoFixture {

    public static ProductPhoto createProductPhotoSetId(long id) {
        ProductPhoto productPhoto = new ProductPhoto(createProduct(), "originalName", "path", 1024L, 1);
        ReflectionTestUtils.setField(productPhoto, "id", id);
        return productPhoto;
    }

    public static ProductPhoto createProductPhotoWithOrder(int order) {
        return new ProductPhoto(createProduct(), "originalName", "path", 1024L, order);
    }

    public static ProductPhoto createProductPhoto() {
        return new ProductPhoto(createProduct(), "originalName", "path", 1024L, 1);
    }

    public static ProductPhoto createProductPhotoWithPathSetId(String path, Long id) {
        ProductPhoto productPhoto = new ProductPhoto(createProduct(), "originalName", path, 1024L, 1);
        ReflectionTestUtils.setField(productPhoto, "id", id);
        return productPhoto;
    }
}
