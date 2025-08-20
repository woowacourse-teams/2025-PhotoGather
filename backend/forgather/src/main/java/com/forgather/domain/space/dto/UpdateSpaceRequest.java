package com.forgather.domain.space.dto;

import java.time.LocalDateTime;

import org.hibernate.validator.constraints.Length;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.FutureOrPresent;
import jakarta.validation.constraints.Positive;

public record UpdateSpaceRequest(

    @Schema(description = "새로운 스페이스 이름", example = "우리의 모임", maxLength = 10, nullable = true)
    @Length(max = 10)
    String name,

    @Schema(description = "새로운 스페이스 지속 기간(시)", example = "48", nullable = true)
    @Positive
    Integer validHours,

    @Schema(description = "새로운 스페이스 오픈 시간(현재 혹은 미래)", example = "2023-10-01T10:00:00", nullable = true)
    @FutureOrPresent
    LocalDateTime openedAt,

    @Schema(description = "새로운 스페이스 비밀번호", example = "password123", nullable = true)
    String password
) {
}
