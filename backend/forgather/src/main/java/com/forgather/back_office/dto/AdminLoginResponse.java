package com.forgather.back_office.dto;

public record AdminLoginResponse(
    String accessToken,
    String refreshToken
) {

    public static AdminLoginResponse of(String accessToken, String refreshToken) {
        return new AdminLoginResponse(accessToken, refreshToken);
    }
}
