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
        final String ip = getClientIp();
        final String formattedAddress = formatWithBrackets("IP", ip);

        final String requestURI = httpServletRequest.getRequestURI();
        final String formattedRequestURI = formatWithBrackets("URI", requestURI);

        return String.format("%s %s",
            formattedAddress,
            formattedRequestURI);
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

    private String getClientIp() {
        String forwarded = httpServletRequest.getHeader("X-Forwarded-For");
        if (forwarded != null) {
            return forwarded.split(",")[0]; // 여러 프록시 거친 경우 첫 IP가 실제 클라이언트
        }
        return httpServletRequest.getRemoteAddr();
    }

    private String getParams(final Object[] args) {
        return Arrays.stream(args)
            .map(Object::toString)
            .collect(Collectors.joining(", "));
    }
}
