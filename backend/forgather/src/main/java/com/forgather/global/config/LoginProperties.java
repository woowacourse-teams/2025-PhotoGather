package com.forgather.global.config;

import org.springframework.boot.context.properties.ConfigurationProperties;

import com.forgather.global.auth.dto.LoginResponse;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@ConfigurationProperties(prefix = "login")
public class LoginProperties {

    private final String baseUrl;
    private final String callbackSuccessPath;
    private final String callbackFailurePath;

    public String getCallbackSuccessUrl(LoginResponse response) {
        String accessToken = response.accessToken();
        String refreshToken = response.refreshToken();
        String queryParams = String.format("?accessToken=%s&refreshToken=%s", accessToken, refreshToken);
        return baseUrl + callbackSuccessPath + queryParams;
    }

    public String getCallbackFailureUrl() {
        return baseUrl + callbackFailurePath;
    }
}
