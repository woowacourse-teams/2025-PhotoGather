package com.forgather.global.logging;

import java.util.Arrays;
import java.util.List;
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
        String traceId = getTraceId();
        String formattedFingerprint = formatFingerprint();
        String requestURI = httpServletRequest.getRequestURI();

        return String.format("%s %s %s",
            formatWithBrackets("traceId", traceId),
            formatWithBrackets("uri", requestURI),
            formattedFingerprint
        );
    }

    public String formatMethodInformation(JoinPoint joinPoint) {
        String methodName = joinPoint.getSignature().toShortString();
        String params = getParams(joinPoint.getArgs());

        return String.format("%s %s",
            formatWithBrackets("methodName", methodName),
            formatWithBrackets("methodParams", params)
        );
    }

    public String formatDurationMillis(long durationMillis) {
        return formatWithBrackets("durationMillis", durationMillis);
    }

    public String formatWithBrackets(String key, Object... values) {
        String joinedValue = Arrays.stream(values)
            .map(String::valueOf)
            .collect(Collectors.joining(" "));

        return String.format("[%s:%s]", key, joinedValue);
    }

    public String formatSegments(List<String> segments) {
        return String.join(" ", segments);
    }

    /**
     * 사용자를 식별할 수 있는 정보를 모아놓았음.
     * 현재 서비스 이용자 대부분이 우아한테크코스의 LAN 환경에 있어서
     * 단순 IP 로는 사용자 추적이 어려움.
     */
    private String formatFingerprint() {
        String clientIp = getClientIp();
        String userAgent = getUserAgent();

        return String.format("%s %s",
            formatWithBrackets("ip", clientIp),
            formatWithBrackets("userAgent", userAgent)
        );
    }

    private String getTraceId() {
        Object traceId = httpServletRequest.getAttribute("com.forgather.traceId");
        if (traceId instanceof String) {
            return String.valueOf(traceId);
        }

        return "UnknownIdentifier";
    }

    private String getClientIp() {
        String forwarded = httpServletRequest.getHeader("X-Forwarded-For");
        if (forwarded != null) {
            return forwarded.split(",")[0]; // 여러 프록시 거친 경우 첫 IP가 실제 클라이언트
        }
        return httpServletRequest.getRemoteAddr();
    }

    private String getUserAgent() {
        String userAgent = httpServletRequest.getHeader("User-Agent");
        if (userAgent == null || userAgent.isEmpty()) {
            return "UnknownUserAgent";
        }
        return userAgent;
    }

    private String getParams(final Object[] args) {
        return Arrays.stream(args)
            .map(Object::toString)
            .collect(Collectors.joining(", "));
    }
}
