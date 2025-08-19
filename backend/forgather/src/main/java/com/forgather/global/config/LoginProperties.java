package com.forgather.global.config;

import org.springframework.boot.context.properties.ConfigurationProperties;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@ConfigurationProperties(prefix = "login")
public class LoginProperties {

    private final String baseUrl;
    private final String callbackSuccessPath;
    private final String callbackFailurePath;

    public String getCallbackSuccessUrl() {
        return baseUrl + callbackSuccessPath;
    }

    public String getCallbackFailureUrl() {
        return baseUrl + callbackFailurePath;
    }
}
