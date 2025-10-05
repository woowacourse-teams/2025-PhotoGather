package com.forgather.domain.product.model;

import static com.forgather.fixture.ProductFixture.createProduct;
import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import com.forgather.global.exception.BaseException;

class ProductPhotoTest {

    @DisplayName("작품 사진의 순서를 변경한다")
    @Test
    void changeOrder() {
        // given
        ProductPhoto productPhoto = new ProductPhoto(createProduct(), "originalName", "path", 1024, 3);

        // when
        productPhoto.changeOrder(1);

        // then
        assertThat(productPhoto.getSortOrder()).isEqualTo(1);
    }

    @DisplayName("작품 사진의 정렬 순서가 0이하이면 예외를 던진다")
    @Test
    void throwExceptionWhenChangeOrderIsInvalid() {
        // given
        ProductPhoto productPhoto = new ProductPhoto(createProduct(), "originalName", "path", 1024, 3);

        // when, then
        assertThatThrownBy(() -> productPhoto.changeOrder(0))
            .isInstanceOf(BaseException.class)
            .hasMessageContaining("정렬 순서는 1 이상이어야 합니다.");
    }
}
