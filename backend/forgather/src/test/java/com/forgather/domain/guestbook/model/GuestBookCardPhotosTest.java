package com.forgather.domain.guestbook.model;

import static com.forgather.fixture.GuestBookCardPhotoFixture.createGuestBookCardPhotoSetId;
import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.junit.jupiter.api.Assertions.assertAll;

import java.util.List;
import java.util.stream.IntStream;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import com.forgather.global.exception.BaseException;

class GuestBookCardPhotosTest {

    @DisplayName("방명록 카드 사진이 20개를 초과하면 예외를 던진다")
    @Test
    void throwExceptionWhenPhotoExceedMaxSize() {
        // given
        List<GuestBookCardPhoto> photos = IntStream.range(0, 21)
            .mapToObj(i -> new GuestBookCardPhoto())
            .toList();

        // when, then
        assertThatThrownBy(() -> new GuestBookCardPhotos(photos))
            .isInstanceOf(BaseException.class)
            .hasMessageContaining("방명록 카드 사진은 최대");
    }

    @DisplayName("주어진 id의 방명록 카드 사진을 삭제하고 삭제된 사진들을 반환한다")
    @Test
    void deleteByIds() {
        // given
        GuestBookCardPhoto guestBookCardPhoto1 = createGuestBookCardPhotoSetId(1L);
        GuestBookCardPhoto guestBookCardPhoto2 = createGuestBookCardPhotoSetId(2L);
        GuestBookCardPhoto guestBookCardPhoto3 = createGuestBookCardPhotoSetId(3L);
        List<GuestBookCardPhoto> photos = List.of(guestBookCardPhoto1, guestBookCardPhoto2, guestBookCardPhoto3);
        GuestBookCardPhotos guestBookCardPhotos = new GuestBookCardPhotos(photos);

        // when
        List<GuestBookCardPhoto> result = guestBookCardPhotos.deleteByIds(List.of(1L, 2L));

        // then
        assertAll(
            () -> assertThat(result).containsExactlyInAnyOrder(guestBookCardPhoto1, guestBookCardPhoto2),
            () -> assertThat(guestBookCardPhotos.getAll()).contains(guestBookCardPhoto3)
        );

    }

    @DisplayName("주어진 id의 방명록 카드 사진이 존재하지 않을 경우 예외를 던진다")
    @Test
    void throwExceptionWhenInvalidDeleteId() {
        // given
        List<GuestBookCardPhoto> photos = List.of(
            createGuestBookCardPhotoSetId(1L),
            createGuestBookCardPhotoSetId(2L),
            createGuestBookCardPhotoSetId(3L)
        );
        GuestBookCardPhotos guestBookCardPhotos = new GuestBookCardPhotos(photos);

        // when, then
        assertThatThrownBy(() -> guestBookCardPhotos.deleteByIds(List.of(1L, 4L)))
            .isInstanceOf(BaseException.class)
            .hasMessageContaining("방명록 카드에 존재하지 않는 사진입니다.");
    }
}
