package com.forgather.global.auth.dto;

import com.forgather.global.auth.model.Host;
import com.forgather.global.auth.model.RefreshToken;

public record LoginResponse(
    Long hostId,
    String refreshToken,
    Long expirationDays
) {

    public static LoginResponse of(Host host, RefreshToken refreshToken) {
        return new LoginResponse(host.getId(), refreshToken.getToken(), 90L);
    }
}
