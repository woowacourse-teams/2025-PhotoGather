package com.forgather.domain.guestbook.model;

import static org.assertj.core.api.Assertions.assertThatThrownBy;

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
}
