package com.forgather.domain.space.dto;

import java.time.LocalDateTime;

import com.forgather.domain.space.model.Photo;

import io.swagger.v3.oas.annotations.media.Schema;

public record PhotoResponse(

    @Schema(description = "사진 ID", example = "1")
    Long id,

    @Schema(description = "사진 경로", example = "contents/fqvtn394y0/photo1.jpg")
    String path,

    @Schema(description = "원본 사진 이름", example = "photo1.jpg")
    String originalName,

    @Schema(description = "사진 촬영 시간", example = "2023-10-01T12:00:00")
    LocalDateTime capturedAt,

    @Schema(description = "사진 생성 시간", example = "2023-10-01T12:00:00")
    LocalDateTime createdAt
) {

    public static PhotoResponse from(Photo photo) {
        return new PhotoResponse(
            photo.getId(),
            photo.getPath(),
            photo.getOriginalName(),
            photo.getCapturedAt(),
            photo.getCreatedAt()
        );
    }
}
