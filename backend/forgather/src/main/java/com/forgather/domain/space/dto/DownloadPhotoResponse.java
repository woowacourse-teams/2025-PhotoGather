package com.forgather.domain.space.dto;

import java.io.InputStream;

import io.swagger.v3.oas.annotations.media.Schema;

public record DownloadPhotoResponse(

    @Schema(description = "사진 확장자", example = "jpeg")
    String extension,

    @Schema(description = "사진 이름", example = "photo.jpeg")
    String name,

    @Schema(description = "사진 파일")
    InputStream photoFile
) {
}
