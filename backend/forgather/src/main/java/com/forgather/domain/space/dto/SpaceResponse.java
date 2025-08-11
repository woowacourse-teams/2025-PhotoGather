package com.forgather.domain.space.dto;

import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.forgather.domain.space.model.Space;

import io.swagger.v3.oas.annotations.media.Schema;

public record SpaceResponse(

    @Schema(description = "스페이스 ID", example = "1")
    Long id,

    @Schema(description = "스페이스 코드", example = "1234567890")
    String spaceCode,

    @Schema(description = "스페이스 이름", example = "My Space")
    String name,

    @Schema(description = "스페이스 시작 시간", example = "2023-10-01T10:00:00")
    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")
    LocalDateTime openedAt,

    @Schema(description = "스페이스 만료 시간", example = "2023-10-04T10:00:00")
    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")
    LocalDateTime expiredAt,

    @Schema(description = "스페이스 만료 여부", example = "false")
    boolean isExpired
) {

    public static SpaceResponse from(Space space) {
        return new SpaceResponse(
            space.getId(),
            space.getCode(),
            space.getName(),
            space.getOpenedAt(),
            space.getExpiredAt(),
            space.isExpired(LocalDateTime.now())
        );
    }
}
