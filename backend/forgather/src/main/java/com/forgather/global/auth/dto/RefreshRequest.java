package com.forgather.global.auth.dto;

import io.swagger.v3.oas.annotations.media.Schema;

public record RefreshRequest(
    @Schema(description = "Refresh Token", example = "eyJraWQiOiJrYWthby1yZWZyZXNoLXRva2VuIiwidHlwIjoiSldUIn0")
    String refreshToken
) {
}
