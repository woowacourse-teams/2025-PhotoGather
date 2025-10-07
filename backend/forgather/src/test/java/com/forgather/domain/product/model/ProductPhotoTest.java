package com.forgather.domain.product.model;

import static com.forgather.fixture.ProductFixture.createProduct;
import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.ValueSource;

import com.forgather.global.exception.BaseException;

class ProductPhotoTest {

    @DisplayName("작품 정보가 null이면 예외를 던진다")
    @Test
    void throwExceptionWhenNoProduct() {
        // when, then
        assertThatThrownBy(() -> new ProductPhoto(null, "originalName", "path", 1024L, 1))
            .isInstanceOf(BaseException.class)
            .hasMessageContaining("작품 정보는 필수입니다.");
    }

    @DisplayName("작품 사진의 정렬 순서 값이 유효하지 않으면 예외를 던진다")
    @ValueSource(ints = {-1, 0, 11})
    @ParameterizedTest
    void throwExceptionWhenOrderIsInvalid(int order) {
        // when, then
        assertThatThrownBy(() -> new ProductPhoto(createProduct(), "originalName", "path", 1024L, order))
            .isInstanceOf(BaseException.class)
            .hasMessageContaining("작품 사진의 정렬 순서는 1 이상, 10 이하여야 합니다.");
    }

    @DisplayName("작품 사진의 순서를 변경한다")
    @Test
    void changeOrder() {
        // given
        ProductPhoto productPhoto = new ProductPhoto(createProduct(), "originalName", "path", 1024L, 3);

        // when
        productPhoto.changeOrder(1);

        // then
        assertThat(productPhoto.getSortOrder()).isEqualTo(1);
    }

    @DisplayName("변경할 작품 사진의 정렬 순서 값이 유효하지 않으면 예외를 던진다")
    @ValueSource(ints = {-1, 0, 11})
    @ParameterizedTest
    void throwExceptionWhenChangeOrderIsInvalid(int order) {
        // given
        ProductPhoto productPhoto = new ProductPhoto(createProduct(), "originalName", "path", 1024L, 1);

        // when, then
        assertThatThrownBy(() -> productPhoto.changeOrder(order))
            .isInstanceOf(BaseException.class)
            .hasMessageContaining("작품 사진의 정렬 순서는 1 이상, 10 이하여야 합니다.");
    }
}
