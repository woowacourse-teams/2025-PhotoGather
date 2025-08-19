package com.forgather.domain.space.model;

import static org.assertj.core.api.Assertions.assertThatIllegalArgumentException;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

import java.time.LocalDateTime;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.ValueSource;
import org.springframework.test.util.ReflectionTestUtils;

import com.forgather.global.auth.model.Host;

class SpaceTest {

    @Test
    @DisplayName("주어진 날짜가 만료 시간을 지나면 .validateExpiration() 메서드가 예외를 던진다")
    void validateExpirationTest() {
        // given
        String spaceCode = "1234567890";
        int validHours = 48;
        LocalDateTime openedAt = LocalDateTime.now();
        Host host = new Host("moko", "pictureUrl");
        Space space = new Space(host, spaceCode, "name", validHours, openedAt);
        LocalDateTime testDateTime = openedAt.plusHours(validHours + 1);

        // when & then
        assertThatThrownBy(() -> space.validateExpiration(testDateTime))
            .isInstanceOf(IllegalArgumentException.class)
            .hasMessage("만료된 스페이스입니다. code: " + spaceCode);
    }

    @DisplayName("스페이스 오픈 시각이 과거라면 예외를 던진다")
    @Test
    void spaceOpenedAtValidationTest() {
        // given
        String spaceCode = "1234567890";
        int validHours = 48;
        LocalDateTime openedAt = LocalDateTime.now().minusDays(1);
        Host host = new Host("moko", "pictureUrl");
        Space space = new Space(host, spaceCode, "name", validHours, openedAt);

        // when & then
        assertThatIllegalArgumentException().isThrownBy(() -> ReflectionTestUtils.invokeMethod(space, "validate"))
            .isInstanceOf(IllegalArgumentException.class)
            .withMessageContaining("스페이스 오픈 시각");
    }

    @DisplayName("스페이스 이름이 비어있거나, 10자 초과면 예외를 던진다")
    @ParameterizedTest
    @ValueSource(strings = {"", " ", "          "})
    void spaceNameValidationTest(String invalidName) {
        // given
        Host host = new Host("moko", "pictureUrl");
        Space space = new Space(host, "1234567890", invalidName, 48, LocalDateTime.now());

        // when & then
        assertThatIllegalArgumentException().isThrownBy(
                () -> ReflectionTestUtils.invokeMethod(space, "validate"))
            .isInstanceOf(IllegalArgumentException.class)
            .withMessageContaining("스페이스 이름");
    }
}
