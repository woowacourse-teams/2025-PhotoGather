package com.forgather.global.logging;

import org.slf4j.MDC;
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

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) {
        // TODO 클라이언트에게서 traceId를 받기
        String traceId = randomCodeGenerator.generate(TRACE_ID_LENGTH);
        request.setAttribute("com.forgather.traceId", traceId);
        request.setAttribute("com.forgather.startTime", System.currentTimeMillis());

        // 해당 쓰레드에서 발생하는 모든 로그에 대해 자동으로 추가됨
        MDC.put("traceId", traceId);
        MDC.put("event", "REQUEST");
        log.atInfo()
            .addKeyValue("httpMethod", request.getMethod())
            .addKeyValue("requestUri", request.getRequestURI())
            .addKeyValue("ip", getClientIp(request))
            .addKeyValue("userAgent", getUserAgent(request))
            .log();
        MDC.remove("event");
        return true;
    }

    private String getClientIp(HttpServletRequest request) {
        String forwarded = request.getHeader("X-Forwarded-For");
        if (forwarded != null) {
            return forwarded.split(",")[0]; // 여러 프록시 거친 경우 첫 IP가 실제 클라이언트
        }
        return request.getRemoteAddr();
    }

    private String getUserAgent(HttpServletRequest request) {
        String userAgent = request.getHeader("User-Agent");
        if (userAgent == null || userAgent.isEmpty()) {
            return "UnknownUserAgent";
        }
        return userAgent;
    }

    @Override
    public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler,
        Exception exception) {
        Long startTime = (Long) request.getAttribute("com.forgather.startTime");
        long durationMillis = (startTime != null) ? (System.currentTimeMillis() - startTime) : -1;

        MDC.put("event", getResponseEvent(response));
        log.atInfo()
            .log("({}ms)", durationMillis);

        // 쓰레드 재활용을 대비한 초기화
        MDC.clear();
    }

    private String getResponseEvent(HttpServletResponse response) {
        HttpStatus httpStatus = HttpStatus.valueOf(response.getStatus());
        return httpStatus.isError() ? "ERROR_RESPONSE" : "RESPONSE";
    }
}
