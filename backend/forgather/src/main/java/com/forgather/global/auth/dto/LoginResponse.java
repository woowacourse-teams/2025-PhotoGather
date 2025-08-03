package com.forgather.global.auth.dto;

import com.forgather.global.auth.domain.Host;
import com.forgather.global.auth.domain.RefreshToken;

public record LoginResponse(

    // @Schema(description = "호스트 아이디", example = "123")
    Long hostId,

    // @Schema(description = "서버 리프레시 토큰", example = "your-refresh-token")
    String refreshToken,

    // @Schema(description = "유효기간")
    Long expirationDays
) {

    public static LoginResponse of(Host host, RefreshToken refreshToken) {
        return new LoginResponse(host.getId(), refreshToken.getToken(), 90L);
    }
}
