package com.forgather.global.logging;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

import com.forgather.global.util.RandomCodeGenerator;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Component
@Slf4j
@RequiredArgsConstructor
public class LoggingInterceptor implements HandlerInterceptor {

    private static final int TRACE_ID_LENGTH = 8;

    private final RandomCodeGenerator randomCodeGenerator;
    private final Logger logger;

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) {
        String traceId = randomCodeGenerator.generate(TRACE_ID_LENGTH);
        request.setAttribute("com.forgather.traceId", traceId);
        request.setAttribute("com.forgather.startTime", System.currentTimeMillis());

        logger.log()
            .event("REQUEST")
            .value("httpMethod", request.getMethod())
            .info();
        return true;
    }

    @Override
    public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler,
        Exception exception) {
        HttpStatus httpStatus = HttpStatus.valueOf(response.getStatus());
        String event = httpStatus.isError() ? "ERROR_RESPONSE" : "RESPONSE";
        Long startTime = (Long)request.getAttribute("com.forgather.startTime");
        long durationMillis = (startTime != null) ? (System.currentTimeMillis() - startTime) : -1;

        logger.log()
            .event(event)
            .value("durationMillis", durationMillis)
            .value("statusCode", httpStatus.value())
            .info();
    }
}
