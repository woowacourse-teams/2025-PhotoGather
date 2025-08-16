package com.forgather.domain.space.dto;

import java.util.List;

import io.swagger.v3.oas.annotations.media.Schema;

public record DownloadPhotosRequest(
    @Schema(description = "다운로드할 사진 ID 목록", example = "[1, 2, 3, 4]")
    List<Long> photoIds
) {
}
