package com.forgather.domain.space.dto;

import io.swagger.v3.oas.annotations.media.Schema;

public record SpaceCapacityResponse(

    @Schema(description = "스페이스 전체 용량 (bytes)", example = "10737418240")
    long totalBytesValue,

    @Schema(description = "스페이스 현재 사용 용량 (bytes)", example = "1073741824")
    long usedBytesValue
) {
}
