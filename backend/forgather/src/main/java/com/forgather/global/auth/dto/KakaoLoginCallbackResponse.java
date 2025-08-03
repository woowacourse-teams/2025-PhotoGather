package com.forgather.global.auth.dto;

import com.forgather.global.auth.domain.KakaoHost;
import com.forgather.global.auth.domain.RefreshToken;

public record KakaoLoginCallbackResponse(

    // @Schema(description = "호스트 아이디", example = "123")
    Long hostId,

    // @Schema(description = "서버 리프레시 토큰", example = "your-refresh-token")
    String refreshToken,

    // @Schema(description = "유효기간")
    Long expirationDays
) {

    public static KakaoLoginCallbackResponse of(KakaoHost kakaoHost, RefreshToken refreshToken) {
        return new KakaoLoginCallbackResponse(kakaoHost.getId(), refreshToken.getToken(), 90L);
    }
}
