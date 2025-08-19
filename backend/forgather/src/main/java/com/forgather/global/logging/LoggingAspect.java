package com.forgather.global.logging;

import java.util.Arrays;
import java.util.stream.Collectors;

import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.springframework.stereotype.Component;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Aspect
@Component
@Slf4j
@RequiredArgsConstructor
public class LoggingAspect {

    @Around("@within(org.springframework.stereotype.Service))")
    public Object loggingService(final ProceedingJoinPoint joinPoint) throws Throwable {
        return logging(joinPoint);
    }

    @Around("execution(* com.forgather.domain.space.service.AwsS3Cloud.*(..))")
    public Object loggingCloudStorage(final ProceedingJoinPoint joinPoint) throws Throwable {
        return logging(joinPoint);
    }

    @Around("execution(* com.forgather..repository..*(..))")
    public Object loggingRepository(final ProceedingJoinPoint joinPoint) throws Throwable {
        return logging(joinPoint);
    }

    public Object logging(final ProceedingJoinPoint joinPoint) throws Throwable {
        long startMillis = System.currentTimeMillis();
        try {
            return joinPoint.proceed();
        } finally {
            long durationMillis = System.currentTimeMillis() - startMillis;
            log.atDebug()
                .addKeyValue("event", getMethodName(joinPoint))
                .addKeyValue("params", getMethodParams(joinPoint))
                .addKeyValue("duration", durationMillis + "ms")
                .log();
        }
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
