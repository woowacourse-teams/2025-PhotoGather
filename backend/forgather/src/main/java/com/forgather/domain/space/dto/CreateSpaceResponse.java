package com.forgather.domain.space.dto;

import com.forgather.domain.space.model.Space;

import io.swagger.v3.oas.annotations.media.Schema;

public record CreateSpaceResponse(
    @Schema(description = "생성된 스페이스 코드", example = "space123")
    String spaceCode
) {

    public static CreateSpaceResponse from(Space space) {
        return new CreateSpaceResponse(space.getSpaceCode());
    }
}
