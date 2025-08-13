package com.forgather.global.logging;

import java.util.Arrays;
import java.util.stream.Collectors;

import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.springframework.stereotype.Component;

import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Aspect
@Component
@Slf4j
@RequiredArgsConstructor
public class LoggingAspect {

    private final HttpServletRequest request;

    @Around("@within(org.springframework.stereotype.Service) || "
        + "execution(* com.forgather.domain.space.service.AwsS3Cloud.*(..))")
    public Object logging(final ProceedingJoinPoint joinPoint) throws Throwable {
        long startMillis = System.currentTimeMillis();
        Object result = joinPoint.proceed();
        long durationMillis = System.currentTimeMillis() - startMillis;

        log.atInfo()
            .addKeyValue("methodName", getMethodName(joinPoint))
            .addKeyValue("methodParams", getMethodParams(joinPoint))
            .addKeyValue("requestUri", request.getRequestURI())
            .log("({}ms)", durationMillis);
        return result;
    }

    public String getMethodName(JoinPoint joinPoint) {
        return joinPoint.getSignature().toShortString();
    }

    public String getMethodParams(JoinPoint joinPoint) {
        return Arrays.stream(joinPoint.getArgs())
            .map(arg -> arg == null ? "null" : arg.toString())
            .collect(Collectors.joining(", "));
    }

}
