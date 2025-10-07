package com.forgather.domain.product.model;

import static com.forgather.fixture.ProductFixture.createProductWithAuthorName;
import static com.forgather.fixture.ProductFixture.createProductWithCategory;
import static com.forgather.fixture.ProductFixture.createProductWithDescription;
import static com.forgather.fixture.ProductFixture.createProductWithSpace;
import static com.forgather.fixture.ProductFixture.createProductWithTitle;
import static com.forgather.fixture.ProductFixture.createProductWithTitleCategoryAuthorNameDescription;
import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.AssertionsForClassTypes.assertThatThrownBy;
import static org.junit.jupiter.api.Assertions.assertAll;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.ValueSource;

import com.forgather.global.exception.BaseException;
import com.forgather.global.exception.BaseNullPointerException;

class ProductTest {

    @DisplayName("작품의 스페이스가 null이면 예외를 던진다")
    @Test
    void throwExceptionWhenSpaceIsNull() {
        // when, then
        assertThatThrownBy(() -> createProductWithSpace(null))
            .isInstanceOf(BaseNullPointerException.class)
            .hasMessageContaining("스페이스는 필수입니다.");
    }

    @DisplayName("작품명이 null이면 예외를 던진다")
    @Test
    void throwExceptionWhenTitleIsNull() {
        // when, then
        assertThatThrownBy(() -> createProductWithTitle(null))
            .isInstanceOf(BaseNullPointerException.class)
            .hasMessageContaining("작품명은 필수입니다.");
    }

    @DisplayName("작품 설명이 null이면 예외를 던진다")
    @Test
    void throwExceptionWhenDescriptionIsNull() {
        // when, then
        assertThatThrownBy(() -> createProductWithDescription(null))
            .isInstanceOf(BaseNullPointerException.class)
            .hasMessageContaining("작품 설명은 필수입니다.");
    }

    @DisplayName("작품명이 공백이면 예외를 던진다")
    @ValueSource(strings = {"", " "})
    @ParameterizedTest
    void throwExceptionWhenNoTitle(String title) {
        // when, then
        assertThatThrownBy(() -> createProductWithTitle(title))
            .isInstanceOf(BaseException.class)
            .hasMessageContaining("작품명은 공백만 입력할 수 없습니다.");
    }

    @DisplayName("작품명의 길이가 50자를 초과하면 예외를 던진다")
    @Test
    void throwExceptionWhenExceedTitleLength() {
        // given
        String title = "0123456789".repeat(5) + 1;

        // when, then
        assertThatThrownBy(() -> createProductWithTitle(title))
            .isInstanceOf(BaseException.class)
            .hasMessageContaining("작품명은 최대");
    }

    @DisplayName("작품 카테고리가 공백이면 예외를 던진다")
    @ValueSource(strings = {"", " "})
    @ParameterizedTest
    void throwExceptionWhenBlankCategory(String category) {
        // when, then
        assertThatThrownBy(() -> createProductWithCategory(category))
            .isInstanceOf(BaseException.class)
            .hasMessageContaining("작품 카테고리는 공백만 입력할 수 없습니다.");
    }

    @DisplayName("작품 카테고리의 길이가 20자를 초과하면 예외를 던진다")
    @Test
    void throwExceptionWhenExceedCategoryLength() {
        // given
        String category = "0123456789".repeat(2) + 1;

        // when, then
        assertThatThrownBy(() -> createProductWithCategory(category))
            .isInstanceOf(BaseException.class)
            .hasMessageContaining("작품 카테고리는 최대");
    }

    @DisplayName("작가명이 공백이면 예외를 던진다")
    @ValueSource(strings = {"", " "})
    @ParameterizedTest
    void throwExceptionWhenBlankAuthorName(String authorName) {
        // when, then
        assertThatThrownBy(() -> createProductWithAuthorName(authorName))
            .isInstanceOf(BaseException.class)
            .hasMessageContaining("작가명은 공백만 입력할 수 없습니다.");
    }

    @DisplayName("작가명의 길이가 20자를 초과하면 예외를 던진다")
    @Test
    void throwExceptionWhenExceedAuthorNameLength() {
        // given
        String authorName = "0123456789".repeat(2) + 1;

        // when, then
        assertThatThrownBy(() -> createProductWithAuthorName(authorName))
            .isInstanceOf(BaseException.class)
            .hasMessageContaining("작가명은 최대");
    }

    @DisplayName("작품 설명이 공백이면 예외를 던진다")
    @ValueSource(strings = {"", " "})
    @ParameterizedTest
    void throwExceptionWhenBlankDescription(String description) {
        // when, then
        assertThatThrownBy(() -> createProductWithDescription(description))
            .isInstanceOf(BaseException.class)
            .hasMessageContaining("작품 설명은 공백만 입력할 수 없습니다.");
    }

    @DisplayName("작품 설명의 길이가 1000자를 초과하면 예외를 던진다")
    @Test
    void throwExceptionWhenExceedDescriptionLength() {
        // given
        String description = "0123456789".repeat(100) + 1;

        // when, then
        assertThatThrownBy(() -> createProductWithDescription(description))
            .isInstanceOf(BaseException.class)
            .hasMessageContaining("작품 설명은 최대");
    }

    @DisplayName("작품 조건부 수정")
    @Test
    void update() {
        // given
        String title = "title";
        String category = "category";
        String authorName = "authorName";
        String description = "description";
        Product product = createProductWithTitleCategoryAuthorNameDescription(title, category, authorName, description);

        // when
        product.update("foovar1", null, null, "foovar2");

        // then
        assertAll(
            () -> assertThat(product.getTitle()).isEqualTo("foovar1"),
            () -> assertThat(product.getCategory()).isEqualTo(category),
            () -> assertThat(product.getAuthorName()).isEqualTo(authorName),
            () -> assertThat(product.getDescription()).isEqualTo("foovar2")
        );
    }
}
