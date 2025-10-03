package com.forgather.domain.space.model;

import static org.assertj.core.api.Assertions.assertThatCode;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.ValueSource;

import com.forgather.global.auth.model.Host;
import com.forgather.global.exception.BaseException;

class SpaceTest {

    @DisplayName("스페이스 이름 이모지 1글자 처리")
    @Test
    void createSpaceWithEmoji() {
        // given
        String spaceCode = "1234567890";
        String emoji = "\uD83D\uDC68\u200D\uD83D\uDC69\u200D\uD83D\uDC67\u200D\uD83D\uDC66"; // // 가족 이모지, length 11
        String name = "우리의 모임12345678" + emoji; // 스페이스 이름에 이모지 포함
        String description = "스페이스 설명";
        String pictureUrl = "/forgather/temp.png";
        String instagramUsername = "forgather_official";
        String email = "forgather@forgather.me";
        Host host = new Host("moko", "pictureUrl");

        // when & then
        assertThatCode(
            () -> new Space(host, spaceCode, name, description, pictureUrl, false, instagramUsername, email)
        ).doesNotThrowAnyException();
    }

    @DisplayName("스페이스 이름이 비어있거나, 15자 초과면 예외를 던진다")
    @ParameterizedTest
    @ValueSource(strings = {"", " ", "abcde12345678901"})
    void spaceNameValidationTest(String invalidName) {
        // given
        String description = "스페이스 설명";
        String pictureUrl = "/forgather/temp.png";
        String instagramUsername = "forgather_official";
        String email = "forgather@forgather.me";
        Host host = new Host("moko", "pictureUrl");

        // when & then
        assertThatThrownBy(
            () -> new Space(host, "1234567890", invalidName, description, pictureUrl, false, instagramUsername, email)
        ).isInstanceOf(BaseException.class)
            .hasMessageContaining("스페이스 이름");
    }

    @DisplayName("스페이스 코드는 10자리여야 한다")
    @Test
    void spaceCodeValidationTest() {
        // given
        String name = "스페이스";
        String description = "스페이스 설명";
        String pictureUrl = "/forgather/temp.png";
        String instagramUsername = "forgather_official";
        String email = "forgather@forgather.me";
        Host host = new Host("moko", "pictureUrl");

        // when & then
        assertThatThrownBy(
            () -> new Space(host, "123456789", name, description, pictureUrl, false, instagramUsername, email)
        ).isInstanceOf(BaseException.class)
            .hasMessageContaining("스페이스 코드");
    }
}
