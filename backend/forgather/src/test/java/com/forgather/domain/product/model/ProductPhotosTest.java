package com.forgather.domain.product.model;

import static com.forgather.fixture.ProductPhotoFixture.createProductPhoto;
import static com.forgather.fixture.ProductPhotoFixture.createProductPhotoSetId;
import static com.forgather.fixture.ProductPhotoFixture.createProductPhotoWithOrder;
import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.junit.jupiter.api.Assertions.assertAll;

import java.util.List;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import com.forgather.global.exception.BaseException;

class ProductPhotosTest {

    @DisplayName("초기 생성 시 작품 사진들을 정렬하여 보관한다")
    @Test
    public void sortByOrderOnInitialization() {
        // given
        ProductPhoto photo1 = createProductPhotoWithOrder(1);
        ProductPhoto photo2 = createProductPhotoWithOrder(3);
        ProductPhoto photo3 = createProductPhotoWithOrder(2);
        ProductPhoto photo4 = createProductPhotoWithOrder(4);

        // when
        ProductPhotos productPhotos = new ProductPhotos(List.of(photo1, photo2, photo3, photo4));
        List<ProductPhoto> result = productPhotos.getAll();

        // then
        assertThat(result).containsExactly(photo1, photo3, photo2, photo4);
    }

    @DisplayName("초기 생성 시 작품 사진들의 순서가 중복되면 예외를 던진다")
    @Test
    public void throwExceptionWhenOrderIsDuplicated() {
        // given
        ProductPhoto photo1 = createProductPhotoWithOrder(1);
        ProductPhoto photo2 = createProductPhotoWithOrder(2);
        ProductPhoto photo3 = createProductPhotoWithOrder(2);

        // when, then
        assertThatThrownBy(() -> new ProductPhotos(List.of(photo1, photo2, photo3)))
            .isInstanceOf(BaseException.class)
            .hasMessageContaining("작품 사진의 정렬 순서는 중복될 수 없습니다.");
    }

    @DisplayName("작품 사진을 추가하고 정렬 순서를 유지한다")
    @Test
    public void assignOrderWhenAddingPhotos() {
        // given
        ProductPhoto photo1 = createProductPhoto();
        ProductPhoto photo2 = createProductPhoto();
        ProductPhoto photo3 = createProductPhoto();

        ProductPhotos productPhotos = new ProductPhotos();

        // when
        productPhotos.add(List.of(photo1, photo2, photo3));

        // then
        assertAll(
            () -> assertThat(photo1.getSortOrder()).isEqualTo(1),
            () -> assertThat(photo2.getSortOrder()).isEqualTo(2),
            () -> assertThat(photo3.getSortOrder()).isEqualTo(3)
        );
    }

    @DisplayName("작품 사진을 삭제하고 정렬 순서를 유지한다")
    @Test
    public void reorderPhotosAfterDeletion() {
        // given
        ProductPhotos productPhotos = new ProductPhotos();
        ProductPhoto photo1 = createProductPhotoSetId(1L);
        ProductPhoto photo2 = createProductPhotoSetId(2L);
        ProductPhoto photo3 = createProductPhotoSetId(3L);
        ProductPhoto photo4 = createProductPhotoSetId(4L);
        productPhotos.add(List.of(photo1, photo2, photo3, photo4));

        // when
        List<ProductPhoto> result = productPhotos.deleteByIds(List.of(photo1.getId(), photo3.getId()));

        // then
        assertAll(
            () -> assertThat(result).containsExactly(photo1, photo3),
            () -> assertThat(photo2.getSortOrder()).isEqualTo(1),
            () -> assertThat(photo4.getSortOrder()).isEqualTo(2)
        );
    }

    @DisplayName("작품 사진을 삭제, 추가하고 정렬 순서를 유지한다")
    @Test
    public void maintainOrderAfterDeleteAndAdd() {
        // given
        ProductPhotos productPhotos = new ProductPhotos();
        ProductPhoto photo1 = createProductPhotoSetId(1L);
        ProductPhoto photo2 = createProductPhotoSetId(2L);
        ProductPhoto photo3 = createProductPhotoSetId(3L);
        ProductPhoto photo4 = createProductPhotoSetId(4L);
        ProductPhoto photo5 = createProductPhotoSetId(5L);
        productPhotos.add(List.of(photo1, photo2, photo3, photo4));

        productPhotos.deleteByIds(List.of(photo2.getId()));

        // when
        productPhotos.add(photo5);
        List<ProductPhoto> result = productPhotos.getAll();

        // then
        assertAll(
            () -> assertThat(result).containsExactly(photo1, photo3, photo4, photo5),
            () -> assertThat(photo1.getSortOrder()).isEqualTo(1),
            () -> assertThat(photo3.getSortOrder()).isEqualTo(2),
            () -> assertThat(photo4.getSortOrder()).isEqualTo(3),
            () -> assertThat(photo5.getSortOrder()).isEqualTo(4)
        );
    }

    @DisplayName("여러 사진을 삭제할 때 순서가 올바르게 재정렬된다")
    @Test
    public void reorderCorrectlyWhenDeletingMultiplePhotos() {
        // given
        ProductPhotos productPhotos = new ProductPhotos();
        ProductPhoto photo1 = createProductPhotoSetId(1L);
        ProductPhoto photo2 = createProductPhotoSetId(2L);
        ProductPhoto photo3 = createProductPhotoSetId(3L);
        ProductPhoto photo4 = createProductPhotoSetId(4L);
        ProductPhoto photo5 = createProductPhotoSetId(5L);
        productPhotos.add(List.of(photo1, photo2, photo3, photo4, photo5));

        // when - 여러 개를 한 번에 삭제
        List<ProductPhoto> result = productPhotos.deleteByIds(List.of(1L, 3L, 4L));

        // then
        assertAll(
            () -> assertThat(result).containsExactly(photo1, photo3, photo4),
            () -> assertThat(photo2.getSortOrder()).isEqualTo(1),
            () -> assertThat(photo5.getSortOrder()).isEqualTo(2)
        );
    }

    @DisplayName("연속된 사진들을 삭제할 때 순서가 올바르게 재정렬된다")
    @Test
    public void reorderCorrectlyWhenDeletingConsecutivePhotos() {
        // given
        ProductPhotos productPhotos = new ProductPhotos();
        ProductPhoto photo1 = createProductPhotoSetId(1L);
        ProductPhoto photo2 = createProductPhotoSetId(2L);
        ProductPhoto photo3 = createProductPhotoSetId(3L);
        ProductPhoto photo4 = createProductPhotoSetId(4L);
        ProductPhoto photo5 = createProductPhotoSetId(5L);
        productPhotos.add(List.of(photo1, photo2, photo3, photo4, photo5));

        // when - 연속된 여러 개 삭제
        productPhotos.deleteByIds(List.of(2L, 3L, 4L));

        // then
        assertAll(
            () -> assertThat(photo1.getSortOrder()).isEqualTo(1),
            () -> assertThat(photo5.getSortOrder()).isEqualTo(2)
        );
    }

    @DisplayName("첫 번째와 마지막 사진을 동시에 삭제할 때 순서가 올바르게 재정렬된다")
    @Test
    public void reorderCorrectlyWhenDeletingFirstAndLast() {
        // given
        ProductPhotos productPhotos = new ProductPhotos();
        ProductPhoto photo1 = createProductPhotoSetId(1L);
        ProductPhoto photo2 = createProductPhotoSetId(2L);
        ProductPhoto photo3 = createProductPhotoSetId(3L);
        ProductPhoto photo4 = createProductPhotoSetId(4L);
        productPhotos.add(List.of(photo1, photo2, photo3, photo4));

        // when
        productPhotos.deleteByIds(List.of(1L, 4L));

        // then
        assertAll(
            () -> assertThat(photo2.getSortOrder()).isEqualTo(1),
            () -> assertThat(photo3.getSortOrder()).isEqualTo(2)
        );
    }

    @DisplayName("순서가 뒤바뀐 ID 리스트로 삭제해도 올바르게 재정렬된다")
    @Test
    public void reorderCorrectlyWithUnorderedDeleteIds() {
        // given
        ProductPhotos productPhotos = new ProductPhotos();
        ProductPhoto photo1 = createProductPhotoSetId(1L);
        ProductPhoto photo2 = createProductPhotoSetId(2L);
        ProductPhoto photo3 = createProductPhotoSetId(3L);
        ProductPhoto photo4 = createProductPhotoSetId(4L);
        ProductPhoto photo5 = createProductPhotoSetId(5L);
        productPhotos.add(List.of(photo1, photo2, photo3, photo4, photo5));

        // when - ID 순서를 뒤죽박죽으로
        productPhotos.deleteByIds(List.of(4L, 1L, 3L));

        // then
        assertAll(
            () -> assertThat(photo2.getSortOrder()).isEqualTo(1),
            () -> assertThat(photo5.getSortOrder()).isEqualTo(2)
        );
    }

    @DisplayName("작품 사진의 개수가 10개를 초과하면 예외를 던진다")
    @Test
    public void throwExceptionWhenExceedMaxCount() {
        // given
        List<ProductPhoto> productPhotos = List.of(
            createProductPhotoWithOrder(1),
            createProductPhotoWithOrder(2),
            createProductPhotoWithOrder(3),
            createProductPhotoWithOrder(4),
            createProductPhotoWithOrder(5),
            createProductPhotoWithOrder(6),
            createProductPhotoWithOrder(7),
            createProductPhotoWithOrder(8),
            createProductPhotoWithOrder(9),
            createProductPhotoWithOrder(10),
            createProductPhotoWithOrder(10)
        );

        // when, then
        assertThatThrownBy(() -> new ProductPhotos(productPhotos))
            .isInstanceOf(BaseException.class)
            .hasMessageContaining("작품 사진은 최대 10개까지만 등록 가능합니다.");
    }

    @DisplayName("작품 사진을 추가할 때 개수가 10개를 초과하면 예외를 던진다")
    @Test
    public void throwExceptionWhenAdditionExceedMaxCount() {
        // given
        List<ProductPhoto> productPhotos = List.of(
            createProductPhotoWithOrder(1),
            createProductPhotoWithOrder(2),
            createProductPhotoWithOrder(3),
            createProductPhotoWithOrder(4),
            createProductPhotoWithOrder(5),
            createProductPhotoWithOrder(6),
            createProductPhotoWithOrder(7),
            createProductPhotoWithOrder(8),
            createProductPhotoWithOrder(9),
            createProductPhotoWithOrder(10)
        );

        // when, then
        assertThatThrownBy(() -> new ProductPhotos(productPhotos).add(createProductPhotoWithOrder(10)))
            .isInstanceOf(BaseException.class)
            .hasMessageContaining("작품 사진은 최대 10개까지만 등록 가능합니다.");
    }
}
