package com.forgather.domain.space.dto;

import io.swagger.v3.oas.annotations.media.Schema;

public record SpacePhotoResponse(

    @Schema(description = "스페이스 프로필 존재 여부", example = "true")
    boolean isExists,

    @Schema(description = "스페이스 프로필 경로", example = "forgather/1234567890/profile.png")
    String path
) {

    public static SpacePhotoResponse exists(String path) {
        return new SpacePhotoResponse(true, path);
    }

    public static SpacePhotoResponse notExists() {
        return new SpacePhotoResponse(false, "");
    }
}
