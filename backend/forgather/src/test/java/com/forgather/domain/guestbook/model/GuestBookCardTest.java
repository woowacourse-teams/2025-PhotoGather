package com.forgather.domain.guestbook.model;

import static com.forgather.fixture.GuestBookCardFixture.createGuestBookCardWithGuest;
import static com.forgather.fixture.GuestBookCardFixture.createGuestBookCardWithMessage;
import static com.forgather.fixture.GuestBookCardFixture.createGuestBookCardWithSpace;
import static org.assertj.core.api.Assertions.assertThatCode;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.ValueSource;

import com.forgather.global.exception.BaseException;
import com.forgather.global.exception.BaseNullPointerException;

class GuestBookCardTest {

    @DisplayName("스페이스가 null이면 예외를 던진다")
    @Test
    void throwExceptionWhenSpaceIsNull() {
        // when, then
        assertThatThrownBy(() -> createGuestBookCardWithSpace(null))
            .isInstanceOf(BaseNullPointerException.class)
            .hasMessageContaining("방명록 카드 스페이스는 null일 수 없습니다.");
    }

    @DisplayName("방문자가 null이면 예외를 던진다")
    @Test
    void throwExceptionWhenGuestIsNull() {
        // when, then
        assertThatThrownBy(() -> createGuestBookCardWithGuest(null))
            .isInstanceOf(BaseNullPointerException.class)
                .hasMessageContaining("방명록 카드 방문자는 null일 수 없습니다.");
    }

    @DisplayName("메세지가 null이면 예외를 던진다")
    @Test
    void throwExceptionWhenMessageIsNull() {
        // when, then
        assertThatThrownBy(() -> createGuestBookCardWithMessage(null))
            .isInstanceOf(BaseNullPointerException.class)
            .hasMessageContaining("방명록 카드 메세지는 null일 수 없습니다.");
    }

    @DisplayName("메세지의 길이가 300자를 초과하면 예외를 던진다")
    @Test
    void throwExceptionWhenMessageExceedMaxLength() {
        // given
        String message = "1234567890".repeat(30) + "c";

        // when, then
        assertThatThrownBy(() -> createGuestBookCardWithMessage(message))
            .isInstanceOf(BaseException.class)
            .hasMessageContaining("방명록 카드 메세지는 최대 300까지 입력 가능합니다.");
    }

    @DisplayName("메세지는 이모지를 한 글자로 간주해 300자까지 입력 가능하다")
    @ValueSource(strings = {"😀", "👦", "👨", "‍👩‍", "‍👦", "‍👩‍👧‍", "👨‍👩‍👧", "👨‍👩‍👧‍👦"})
    @ParameterizedTest
    void countEmojiAsOneCharAtMessage(String emoji) {
        // given
        String message = emoji.repeat(299) + "c";

        // when, then
        assertThatCode(() -> createGuestBookCardWithMessage(message)).doesNotThrowAnyException();
    }
}
