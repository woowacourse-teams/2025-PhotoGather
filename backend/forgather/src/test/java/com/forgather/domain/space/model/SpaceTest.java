package com.forgather.domain.space.model;

import static org.assertj.core.api.Assertions.assertThatThrownBy;

import java.time.LocalDateTime;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

class SpaceTest {

    @DisplayName("주어진 날짜가 만료일을 지나면 예외를 던진다")
    @Test
    public void validateExceedExpirationDate() {
        String spaceCode = "spaceCode";
        int validDays = 3;
        LocalDateTime opendAt = LocalDateTime.of(2025, 8, 2, 14, 0);
        Space sut = new Space(spaceCode, "password", "name", validDays, opendAt);
        LocalDateTime currentDateTime = opendAt.plusDays(validDays + 1);

        assertThatThrownBy(() -> sut.validateExpiration(currentDateTime))
            .isInstanceOf(IllegalArgumentException.class)
            .hasMessage("만료된 스페이스입니다. spaceCode: " + spaceCode);
    }
}
