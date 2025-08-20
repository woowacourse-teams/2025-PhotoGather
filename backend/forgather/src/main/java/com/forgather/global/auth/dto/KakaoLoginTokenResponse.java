package com.forgather.global.auth.dto;

import io.swagger.v3.oas.annotations.media.Schema;

public record KakaoLoginTokenResponse(

    @Schema(description = "client_id", example = "your-client-id")
    String clientId
) {
}
