package com.forgather.domain.space.dto;

import com.forgather.domain.space.model.SpacePhoto;

import io.swagger.v3.oas.annotations.media.Schema;

public record SpacePhotoResponse(

    @Schema(description = "스페이스 프로필 존재 여부", example = "true")
    boolean isExists,

    @Schema(description = "스페이스 프로필 경로", example = "photogather/v2/spaces/1234567890/space/profile.png")
    String path
) {

    public static SpacePhotoResponse from(SpacePhoto spacePhoto) {
        return new SpacePhotoResponse(spacePhoto.isExists(), spacePhoto.getPath());
    }
}
