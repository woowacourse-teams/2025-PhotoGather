package com.forgather.global.logging;

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

    private final LogFormatter logFormatter;

    @Around("@within(org.springframework.stereotype.Service) || "
        + "execution(* com.forgather.domain.space.service.AwsS3Cloud.*(..))")
    public Object logging(final ProceedingJoinPoint joinPoint) throws Throwable {
        String methodInformation = logFormatter.formatMethodInformation(joinPoint);
        String requestInformation = logFormatter.formatRequestInformation();

        long startMillis = System.currentTimeMillis();
        Object result = joinPoint.proceed();
        String durationInformation = logFormatter.formatDurationMillis(System.currentTimeMillis() - startMillis);

        log.info("{} {} {}",
            methodInformation, durationInformation, requestInformation);

        return result;
    }
}
