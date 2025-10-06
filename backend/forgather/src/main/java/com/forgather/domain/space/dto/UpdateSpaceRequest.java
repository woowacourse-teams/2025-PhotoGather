package com.forgather.domain.space.dto;

import org.hibernate.validator.constraints.Length;

import io.swagger.v3.oas.annotations.media.Schema;

public record UpdateSpaceRequest(

    @Schema(description = "새로운 스페이스 이름", example = "우리의 모임", maxLength = 10, nullable = true)
    @Length(max = 10)
    String name
) {
}
