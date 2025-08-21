package com.forgather.domain.space.dto;

import io.swagger.v3.oas.annotations.media.Schema;

public record SpaceCapacityResponse(

    @Schema(description = "스페이스 최대 용량 (bytes)", example = "10737418240")
    long maxCapacity,

    @Schema(description = "스페이스 현재 사용중인 용량 (bytes)", example = "1073741824")
    long usedCapacity
) {
}
