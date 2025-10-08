package com.forgather.domain.upload.dto;

import java.util.List;

import com.forgather.domain.upload.domain.UploadCategory;

import io.swagger.v3.oas.annotations.media.Schema;

public record IssueSignedUrlRequest(

    @Schema(description = "업로드 파일 카테고리", example = "PRODUCT", examples = {"PRODUCT", "GUESTBOOK"})
    UploadCategory category,

    @Schema(description = "업로드 파일 이름 목록", example = "[\"UUID1.png\", \"UUID2.jpeg\", \"UUID3.png\"]")
    List<String> uploadFileNames
) {
}
