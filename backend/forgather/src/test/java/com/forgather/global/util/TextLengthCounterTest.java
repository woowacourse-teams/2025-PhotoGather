package com.forgather.global.util;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.CsvSource;

class TextLengthCounterTest {

    @DisplayName("이모지의 길이를 1로 계산한다.")
    @CsvSource(value = {
        "😀😀😀😀😀😀😀😀😀,10",
        "👨‍👩‍👧‍👦👨‍👩‍👧‍👦👨‍👩‍👧‍👦👨‍👩‍👧‍👦👨‍👩‍👧‍👦👨‍👩‍👧‍👦👨‍👩‍👧‍👦👨‍👩‍👧‍👦👨‍👩‍👧‍👦,10"
    })
    @ParameterizedTest
    void countEmoji(String emojis, int expectedLength) {
        // given
        String text = "1" + emojis;

        // when
        int result = TextLengthCounter.count(text);

        // then
        assertThat(text.length()).isNotEqualTo(expectedLength);
        assertThat(result).isEqualTo(expectedLength);
    }

    @DisplayName("공백의 길이를 1로 계산한다.")
    @Test
    void countWhiteSpace() {
        // given
        String textWithWhiteSpace = "1" + " ";

        // when
        int result = TextLengthCounter.count(textWithWhiteSpace);

        // then
        assertThat(result).isEqualTo(2);
    }

    @DisplayName("빈 문자열의 길이는 0이다.")
    @Test
    void countEmptyText() {
        // given
        String emptyText = "";

        // when
        int result = TextLengthCounter.count(emptyText);

        // then
        assertThat(result).isZero();
    }

    @DisplayName("문자열 길이 계산에 null은 들어올 수 없다.")
    @Test
    void countNullText() {
        // when & then
        assertThatThrownBy(() -> TextLengthCounter.count(null))
            .isInstanceOf(IllegalArgumentException.class);
    }
}
