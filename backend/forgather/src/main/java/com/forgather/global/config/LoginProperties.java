package com.forgather.global.config;

import org.springframework.boot.context.properties.ConfigurationProperties;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@ConfigurationProperties(prefix = "login")
public class LoginProperties {

    private final String baseUrl;
    private final String callbackSuccessPath;
    private final String callbackFailurePath;

    public String getCallbackSuccessUrl(String baseUrl) {
        if (baseUrl == null) {
            return this.baseUrl + callbackSuccessPath;
        }
        return baseUrl + callbackSuccessPath;
    }

    public String getCallbackFailureUrl(String baseUrl) {
        if (baseUrl == null) {
            return this.baseUrl + callbackFailurePath;
        }
        return baseUrl + callbackFailurePath;
    }
}
