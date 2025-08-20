package com.forgather.domain.space.model;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatIllegalArgumentException;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

import java.time.LocalDateTime;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.ValueSource;

class SpaceTest {

    @Test
    @DisplayName("주어진 날짜가 만료 시간을 지나면 .validateExpiration() 메서드가 예외를 던진다")
    void validateExpirationTest() {
        // given
        String spaceCode = "1234567890";
        int validHours = 48;
        LocalDateTime openedAt = LocalDateTime.now();
        Space space = new Space(spaceCode, "password", "name", validHours, openedAt);
        LocalDateTime testDateTime = openedAt.plusHours(validHours + 1);

        // when & then
        assertThatThrownBy(() -> space.validateExpiration(testDateTime))
            .isInstanceOf(IllegalArgumentException.class)
            .hasMessage("만료된 스페이스입니다. code: " + spaceCode);
    }

    @DisplayName("스페이스 오픈 시각이 현재 시각보다 이전이면 예외를 던진다")
    @Test
    void openedAtValidationTest() {
        // given
        String spaceCode = "1234567890";
        int validHours = 48;
        LocalDateTime openedAt = LocalDateTime.now().minusDays(1);

        // when & then
        assertThatIllegalArgumentException().isThrownBy(
            () -> new Space(spaceCode, "password", "name", validHours, openedAt)
        );
    }

    @DisplayName("스페이스 이름이 비어있거나, 10자 초과면 예외를 던진다")
    @ParameterizedTest
    @ValueSource(strings = {"", " ", "12345678901"})
    void spaceNameValidationTest(String invalidName) {

        // when & then
        assertThatIllegalArgumentException().isThrownBy(
            () -> new Space("1234567890", "password", invalidName, 48, LocalDateTime.now())
        ).withMessageContaining("스페이스 이름");
    }

    @DisplayName("스페이스가 열려있으면 .isOpened() 메서드가 true를 반환한다")
    @Test
    void isOpenedTest() {
        // given
        String spaceCode = "1234567890";
        int validHours = 48;
        LocalDateTime openedAt = LocalDateTime.now();
        Space space = new Space(spaceCode, "password", "name", validHours, openedAt);

        // when
        boolean isOpened = space.isOpened(LocalDateTime.now().plusHours(1));

        // then
        assertThat(isOpened).isTrue();
    }

    @DisplayName("스페이스가 만료되면 .isExpired() 메서드가 true를 반환한다")
    @Test
    void isExpiredTest() {
        // given
        String spaceCode = "1234567890";
        int validHours = 48;
        LocalDateTime openedAt = LocalDateTime.now();
        Space space = new Space(spaceCode, "password", "name", validHours, openedAt);

        // when
        boolean isExpired = space.isExpired(LocalDateTime.now().plusHours(validHours + 1));

        // then
        assertThat(isExpired).isTrue();
    }

    @DisplayName("스페이스 오픈 시각을 변경할 때, 이미 오픈 된 스페이스는 예외를 던진다")
    @Test
    void setOpenedAtExpiredSpaceTest() {
        // given
        String spaceCode = "1234567890";
        int validHours = 48;
        LocalDateTime openedAt = LocalDateTime.now();
        Space space = new Space(spaceCode, "password", "name", validHours, openedAt);

        // when & then
        assertThatIllegalArgumentException().isThrownBy(
                () -> space.update(null, null, LocalDateTime.now().plusSeconds(1), null))
            .withMessageContaining("이미 열린");
    }

    @DisplayName("스페이스 유효 시간은 1시간 이상이어야 한다")
    @Test
    void validHoursValidationTest() {
        // when & then
        assertThatIllegalArgumentException().isThrownBy(
                () -> new Space("1234567890", "password", "name", 0, LocalDateTime.now()))
            .withMessageContaining("스페이스 유효 시간");
    }

    @DisplayName("스페이스 코드는 10자리여야 한다")
    @Test
    void spaceCodeValidationTest() {
        // when & then
        assertThatIllegalArgumentException().isThrownBy(
                () -> new Space("123456789", "password", "name", 48, LocalDateTime.now()))
            .withMessageContaining("스페이스 코드");
    }
}
