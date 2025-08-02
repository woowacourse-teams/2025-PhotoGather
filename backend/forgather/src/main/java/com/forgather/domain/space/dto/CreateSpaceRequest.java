package com.forgather.domain.space.dto;

import java.time.LocalDateTime;

import com.forgather.domain.space.model.Space;

import io.swagger.v3.oas.annotations.media.Schema;

public record CreateSpaceRequest(

    @Schema(description = "스페이스 이름", example = "우리의 모임")
    String name,

    @Schema(description = "스페이스 지속 기간(일)", example = "3")
    int validDays,

    @Schema(description = "스페이스 오픈 시간", example = "2023-10-01T10:00:00")
    LocalDateTime openedAt,

    @Schema(description = "스페이스 비밀번호", example = "password123")
    String password
) {

    public Space toEntity(String spaceCode) {
        return new Space(spaceCode, password, name, validDays, openedAt);
    }
}
