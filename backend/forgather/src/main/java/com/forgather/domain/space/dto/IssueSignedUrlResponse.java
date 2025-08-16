package com.forgather.domain.space.dto;

import java.util.Map;

import io.swagger.v3.oas.annotations.media.Schema;

public record IssueSignedUrlResponse(

    @Schema(description = "서명된 URL 목록", example = """
        {
            "UUID1.png": "https://my-bucket.s3.ap-northeast-2.amazonaws.com/UUID1.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=EXAMPLE...",
            "UUID2.jpg": "https://my-bucket.s3.ap-northeast-2.amazonaws.com/UUID2.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=EXAMPLE..."
        }
        """)
    Map<String, String> signedUrls
) {
}
