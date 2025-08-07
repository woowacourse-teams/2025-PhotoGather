package com.forgather.global.auth.dto;

import io.swagger.v3.oas.annotations.media.Schema;

public record KakaoLoginUrlResponse(
    @Schema(description = "Kakao 로그인 페이지로 리다이렉트하기 위한 URL")
    String loginUrl
) {

    public static KakaoLoginUrlResponse from(String kakaoLoginUrl) {
        return new KakaoLoginUrlResponse(kakaoLoginUrl);
    }
}
