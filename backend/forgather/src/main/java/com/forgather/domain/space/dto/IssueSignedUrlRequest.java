package com.forgather.domain.space.dto;

import java.util.List;

import io.swagger.v3.oas.annotations.media.Schema;

public record IssueSignedUrlRequest(

    @Schema(description = "업로드 파일 이름 목록", example = "[\"UUID1.png\", \"UUID2.jpeg\", \"UUID3.png\"]")
    List<String> uploadFileNames
) {
}
