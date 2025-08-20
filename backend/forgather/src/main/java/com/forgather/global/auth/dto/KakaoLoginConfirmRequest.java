package com.forgather.global.auth.dto;

import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;

import io.swagger.v3.oas.annotations.media.Schema;

@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
public record KakaoLoginConfirmRequest(

    @Schema(description = "사용자 액세스 토큰", example = "your-access-token")
    String accessToken,

    @Schema(description = "토큰 타입", example= "bearer")
    String tokenType,

    @Schema(description = "사용자 리프레시 토큰", example = "your-refresh-token")
    String refreshToken,

    @Schema(description = "ID 토큰", example = "your-id-token")
    String idToken,

    @Schema(description = "액세스 토큰과 ID 토큰의 만료 시간(초)", example = "3600")
    Long expiresIn,

    @Schema(description = "인증된 사용자의 정보 조회 권한 범위", example = "profile, account_email")
    String scope,

    @Schema(description = "리프레시 토큰 만료 시간(초)", example = "604800")
    String refreshTokenExpiresIn
) {
}
