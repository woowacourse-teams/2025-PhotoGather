package com.forgather.global.logging;

import java.util.Arrays;
import java.util.stream.Collectors;

import org.aspectj.lang.JoinPoint;
import org.springframework.stereotype.Component;

import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class LogFormatter {

    private final HttpServletRequest httpServletRequest;

    public String formatRequestInformation() {
        final String formattedFingerprint = formatFingerprint();
        final String requestURI = httpServletRequest.getRequestURI();

        return String.format("%s %s",
            formatWithBrackets("URI", requestURI),
            formattedFingerprint
        );
    }

    public String formatMethodInformation(JoinPoint joinPoint) {
        final String methodName = joinPoint.getSignature().toShortString();
        final String params = getParams(joinPoint.getArgs());

        return String.format("%s %s",
            formatWithBrackets("MethodName", methodName),
            formatWithBrackets("MethodParams", params)
        );
    }

    public String formatDurationMillis(long durationMillis) {
        return formatWithBrackets("DurationMillis", durationMillis);
    }

    public String formatWithBrackets(String key, Object... values) {
        String joinedValue = Arrays.stream(values)
            .map(String::valueOf) // null-safe toString
            .collect(Collectors.joining(" "));

        return String.format("[%s:%s]", key, joinedValue);
    }

    /**
     * 사용자를 식별할 수 있는 정보를 모아놓았음.
     * 현재 서비스 이용자 대부분이 우아한테크코스의 LAN 환경에 있어서
     * 단순 IP 로는 사용자 추적이 어려움.
     */
    private String formatFingerprint() {
        final String clientIp = getClientIp();
        final String forwardedPort = getForwardedPort();
        final String userAgent = getUserAgent();
        final String acceptLanguage = getAcceptLanguage();

        return String.format("%s %s %s %s",
            formatWithBrackets("IP", clientIp),
            formatWithBrackets("PORT", forwardedPort),
            formatWithBrackets("USER_AGENT", userAgent),
            formatWithBrackets("ACCEPT_LANGUAGE", acceptLanguage)
        );
    }

    private String getClientIp() {
        String forwarded = httpServletRequest.getHeader("X-Forwarded-For");
        if (forwarded != null) {
            return forwarded.split(",")[0]; // 여러 프록시 거친 경우 첫 IP가 실제 클라이언트
        }
        return httpServletRequest.getRemoteAddr();
    }

    private String getForwardedPort() {
        String forwarded = httpServletRequest.getHeader("X-Forwarded-Port");
        if (forwarded != null && !forwarded.isEmpty()) {
            return forwarded;
        }
        return "UnknownPort";
    }

    private String getUserAgent() {
        String userAgent = httpServletRequest.getHeader("User-Agent");
        if (userAgent == null || userAgent.isEmpty()) {
            return "UnknownUserAgent";
        }
        return userAgent;
    }

    private String getAcceptLanguage() {
        String language = httpServletRequest.getHeader("Accept-Language");
        if (language == null || language.isEmpty()) {
            return "UnknownLanguage";
        }
        return language;
    }

    private String getParams(final Object[] args) {
        return Arrays.stream(args)
            .map(Object::toString)
            .collect(Collectors.joining(", "));
    }
}
