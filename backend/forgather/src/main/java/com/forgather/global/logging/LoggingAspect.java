package com.forgather.global.logging;

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

    private final HttpServletRequest httpServletRequest;
    private final LogFormatter logFormatter;

    @Around("@within(org.springframework.stereotype.Service)")
    public Object logging(final ProceedingJoinPoint joinPoint) throws Throwable {
        String methodInformation = logFormatter.formatMethodInformation(joinPoint);
        String requestInformation = logFormatter.formatRequestInformation(httpServletRequest);

        final long startMillis = System.currentTimeMillis();
        final Object result = joinPoint.proceed();
        final String durationInformation = logFormatter.formatDurationMillis(System.currentTimeMillis() - startMillis);

        log.info("{} {} {}",
            methodInformation, requestInformation, durationInformation);

        return result;
    }
}
