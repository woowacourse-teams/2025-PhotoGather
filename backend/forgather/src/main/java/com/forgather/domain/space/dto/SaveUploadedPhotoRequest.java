package com.forgather.domain.space.dto;

import static com.forgather.domain.space.service.FilePathGenerator.generateContentsFilePath;

import java.time.LocalDateTime;
import java.util.List;

import com.forgather.domain.space.model.Photo;
import com.forgather.domain.space.model.PhotoMetaData;
import com.forgather.domain.space.model.Space;

import io.swagger.v3.oas.annotations.media.Schema;

public record SaveUploadedPhotoRequest(

    @Schema(description = "게스트 닉네임", example = "성원숭이분노의앞니")
    String nickname,

    @Schema(description = "업로드된 사진 목록")
    List<UploadedPhoto> uploadedPhotos
) {

    public record UploadedPhoto(

        @Schema(description = "업로드 파일 이름", example = "UUID1.png")
        String uploadFileName,

        @Schema(description = "사진의 원본 이름", example = "IMG_992.png")
        String originalName,

        @Schema(description = "사진 촬영 시간", example = "2023-10-01T12:00:00")
        LocalDateTime capturedAt
    ) {

        public Photo toEntity(Space space, String rootDirectory) {
            String path = generateContentsFilePath(rootDirectory, space.getCode(), uploadFileName);
            return new Photo(space, originalName, path, new PhotoMetaData(capturedAt));
        }
    }
}
