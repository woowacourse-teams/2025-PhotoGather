package com.forgather.domain.guestbook.dto;

import io.swagger.v3.oas.annotations.media.Schema;

public record GuestBookCardSimpleResponse(
    @Schema(example = "1")
    Long id,

    @Schema(description = "방문자 닉네임", example = "밍퐁루블")
    String nickname,

    @Schema(description = "사진 포함 여부", example = "false")
    Boolean containsPhoto,

    @Schema(description = "호스트 읽음 여부", example = "false")
    Boolean isRead
) {
}
