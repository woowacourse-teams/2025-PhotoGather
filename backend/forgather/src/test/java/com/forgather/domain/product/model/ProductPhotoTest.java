package com.forgather.domain.product.model;

import static com.forgather.fixture.ProductFixture.createProduct;
import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

class ProductPhotoTest {

    @DisplayName("작품 사진의 정렬 순서를 앞당길 수 있다")
    @Test
    void pullOrder() {
        // given
        ProductPhoto productPhoto = new ProductPhoto(createProduct(), "originalName", "path", 1024, 3);

        // when
        productPhoto.pullOrder();

        // then
        assertThat(productPhoto.getSortOrder()).isEqualTo(2);
    }

    @DisplayName("작품 사진의 순서를 변경할 수 있다")
    @Test
    void changeOrder() {
        // given
        ProductPhoto productPhoto = new ProductPhoto(null, "originalName", "path", 1024, 3);

        // when
        productPhoto.changeOrder(1);

        // then
        assertThat(productPhoto.getSortOrder()).isEqualTo(1);
    }
}
