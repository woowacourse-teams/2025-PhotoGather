package com.forgather.domain.guestbook.dto;

import java.util.List;

import io.swagger.v3.oas.annotations.media.Schema;

public record DeleteGuestBookCardPhotosRequest(
    @Schema(description = "삭제할 방명록 카드 사진 id 목록", example = "[2, 3]")
    List<Long> deletePhotoIds
) {
}
