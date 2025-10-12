package com.forgather.domain.guestbook.model;

import static com.forgather.fixture.GuestFixture.createGuestWithNickname;
import static org.assertj.core.api.Assertions.assertThatCode;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.ValueSource;

import com.forgather.global.exception.BaseException;
import com.forgather.global.exception.BaseNullPointerException;

class GuestTest {

    @DisplayName("닉네임이 null이면 예외를 던진다")
    @Test
    void throwExceptionWhenNicknameIsNull() {
        // when, then
        assertThatThrownBy(() -> createGuestWithNickname(null))
            .isInstanceOf(BaseNullPointerException.class)
            .hasMessageContaining("방문자 닉네임은 null일 수 없습니다.");
    }

    @DisplayName("닉네임이 공백이면 예외를 던진다")
    @ValueSource(strings = {"", " "})
    @ParameterizedTest
    void throwExceptionWhenNicknameIsBlank(String nickname) {
        // when, then
        assertThatThrownBy(() -> createGuestWithNickname(nickname))
            .isInstanceOf(BaseException.class)
            .hasMessageContaining("방문자 닉네임은 공백만 입력할 수 없습니다");
    }

    @DisplayName("닉네임의 길이가 10자를 초과하면 예외를 던진다")
    @Test
    void throwExceptionWhenNicknameExceedMaxLength() {
        // given
        String nickname = "1234567890" + "c";

        // when, then
        assertThatThrownBy(() -> createGuestWithNickname(nickname))
            .isInstanceOf(BaseException.class)
            .hasMessageContaining("방문자 닉네임은 최대 10자까지 입력 가능합니다");
    }

    @DisplayName("닉네임은 이모지를 한 글자로 간주해 10자까지 입력 가능하다")
    @ValueSource(strings = {"😀", "👦", "👨", "‍👩‍", "‍👦", "‍👩‍👧‍", "👨‍👩‍👧", "👨‍👩‍👧‍👦"})
    @ParameterizedTest
    void countEmojiAsOneCharAtNickname(String emoji) {
        // given
        String nickname = emoji.repeat(9) + "c";

        // when, then
        assertThatCode(() -> createGuestWithNickname(nickname)).doesNotThrowAnyException();
    }
}
