package com.forgather.global.auth.dto;

import io.swagger.v3.oas.annotations.media.Schema;

public record LoginResponse(

    @Schema(description = "Access Token", example = "eyJraWQiOiJrYWthby1hY2Nlc3MtdG9rZW4iLCJ0eXAiOiJKV1QifQ...")
    String accessToken,
    @Schema(description = "Refresh Token", example = "eyJraWQiOiJrYWthby1yZWZyZXNoLXRva2VuIiwidHlwIjoiSldUIn0...")
    String refreshToken
) {

    public static LoginResponse of(String accessToken, String refreshToken) {
        return new LoginResponse(accessToken, refreshToken);
    }
}
