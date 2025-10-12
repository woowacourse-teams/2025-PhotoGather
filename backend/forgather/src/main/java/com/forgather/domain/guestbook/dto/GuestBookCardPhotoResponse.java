package com.forgather.domain.guestbook.dto;

import io.swagger.v3.oas.annotations.media.Schema;

public record GuestBookCardPhotoResponse(
    @Schema(example = "1")
    Long id,

    @Schema(description = "사진 원본명", example = "photo1.jpg")
    String originalName,

    @Schema(description = "사진 업로드 경로", example = "photogather/v2/spaces/1234567890/guestbook/abc.jpg")
    String path
) {
}
