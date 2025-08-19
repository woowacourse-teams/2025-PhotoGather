package com.forgather.domain.space.dto;

import java.util.List;

public record DownloadUrlsResponse(
    List<String> downloadUrls
) {
}
