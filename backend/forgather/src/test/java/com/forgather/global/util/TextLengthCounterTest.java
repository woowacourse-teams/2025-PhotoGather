package com.forgather.global.util;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

class TextLengthCounterTest {

    @DisplayName("이모지의 길이를 1로 계산한다.")
    @Test
    void countEmoji() {
        // given
        String twoEmojis = "1" + "😀";

        // when
        int result = TextLengthCounter.count(twoEmojis);

        // then
        assertThat(twoEmojis.length()).isNotEqualTo(2);
        assertThat(result).isEqualTo(2);
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
}
