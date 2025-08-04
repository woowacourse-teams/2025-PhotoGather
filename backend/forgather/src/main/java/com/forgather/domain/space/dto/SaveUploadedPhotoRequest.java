package com.forgather.domain.space.dto;

import java.time.LocalDateTime;

import com.forgather.domain.space.model.Photo;
import com.forgather.domain.space.model.PhotoMetaData;
import com.forgather.domain.space.model.Space;

import io.swagger.v3.oas.annotations.media.Schema;

public record SaveUploadedPhotoRequest(
    @Schema(description = "사진이 업로드 된 경로", example = "forgather/contents/1234567890/abcdefghijk.jpeg")
    String uploadedPath,

    @Schema(description = "사진의 원본 이름", example = "IMG_992.jpeg")
    String originalName,

    @Schema(description = "사진 촬영 시간", example = "2023-10-01T12:00:00")
    LocalDateTime capturedAt
) {

    public Photo toEntity(Space space) {
        return new Photo(space, originalName, uploadedPath, new PhotoMetaData(capturedAt));
    }
}
