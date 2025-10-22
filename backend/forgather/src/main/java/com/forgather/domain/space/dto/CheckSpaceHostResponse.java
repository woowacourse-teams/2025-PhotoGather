package com.forgather.domain.space.dto;

import io.swagger.v3.oas.annotations.media.Schema;

public record CheckSpaceHostResponse(
    @Schema(description = "스페이스 호스트 여부, true일 경우 스페이스의 호스트가 맞다", example = "true")
    Boolean isSpaceHost
) {
}
