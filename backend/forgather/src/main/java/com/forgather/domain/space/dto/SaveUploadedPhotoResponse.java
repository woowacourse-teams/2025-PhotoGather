package com.forgather.domain.space.dto;

import io.swagger.v3.oas.annotations.media.Schema;

public record SaveUploadedPhotoResponse(
    @Schema(description = "사진이 저장된 스페이스 이름", example = "8월의 버스킹")
    String spaceName,

    @Schema(description = "저장된 사진의 개수", example = "18")
    int savedCount
) {
}
