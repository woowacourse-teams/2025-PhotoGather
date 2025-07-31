package com.forgather.global.auth.dto;

import com.forgather.global.auth.domain.KakaoHost;

import io.swagger.v3.oas.annotations.media.Schema;

public record KakaoLoginCallbackResponse(
    @Schema(description = "카카오 로그인 콜백에서 받은 액세스 토큰", example = "your-access-token")
    String accessToken
) {

    public static KakaoLoginCallbackResponse from(KakaoHost kakaoHost) {
        return new KakaoLoginCallbackResponse(kakaoHost.getAccessToken());
    }
}
