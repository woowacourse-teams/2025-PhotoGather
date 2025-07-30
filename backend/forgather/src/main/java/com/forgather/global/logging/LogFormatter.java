package com.forgather.global.logging;

import java.util.Arrays;
import java.util.stream.Collectors;

import org.aspectj.lang.JoinPoint;
import org.springframework.stereotype.Component;

import jakarta.servlet.http.HttpServletRequest;

@Component
public class LogFormatter {

    public String formatRequestInformation(HttpServletRequest httpServletRequest) {
        final String ip = httpServletRequest.getRemoteAddr();
        final int port = httpServletRequest.getRemotePort();
        final String formattedAddress = formatWithBrackets("IP", ip, port);

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

    private String formatWithBrackets(String key, Object... values) {
        String joinedValue = Arrays.stream(values)
            .map(String::valueOf) // null-safe toString
            .collect(Collectors.joining(" "));

        return String.format("[%s:%s]", key, joinedValue);
    }

    private String getParams(final Object[] args) {
        return Arrays.stream(args)
            .map(Object::toString)
            .collect(Collectors.joining(", "));
    }

    public String formatDurationMillis(long durationMillis) {
        return formatWithBrackets("DurationMillis", durationMillis);
    }
}
