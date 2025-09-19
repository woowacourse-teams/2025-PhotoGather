package com.forgather.domain.space.dto;

import java.util.List;

import io.swagger.v3.oas.annotations.media.Schema;

public record DownloadUrlsResponse(
    @Schema(description = "다운로드 URL 목록")
    List<DownloadUrl> downloadUrls
) {

    public record DownloadUrl(
        @Schema(description = "원본 이름", example = "photo1.jpg")
        String originalName,

        @Schema(description = "다운로드 URL",
            example = "photogather/contents/0987654321/UUID1.jpg")
        String url
    ) {
        public static DownloadUrl from(String originalName, String url) {
            return new DownloadUrl(originalName, url);
        }
    }
}
