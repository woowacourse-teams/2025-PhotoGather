package com.forgather.global.logging;

import java.io.IOException;

import org.slf4j.MDC;
import org.slf4j.Marker;
import org.slf4j.MarkerFactory;
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

    private static final String TRACE_ID_HEADER = "trace-id";
    private static final String MDC_TRACE_ID_KEY = "traceId";
    private static final int TRACE_ID_LENGTH = 8;
    private static final Marker BODY_MARKER = MarkerFactory.getMarker("BODY");

    private final RandomCodeGenerator randomCodeGenerator;

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) {
        request.setAttribute("com.forgather.startTime", System.currentTimeMillis());

        String traceId = extractTraceId(request);
        String formattedTraceId = "\"" + traceId + "\"";

        MDC.put(MDC_TRACE_ID_KEY, formattedTraceId); // 해당 쓰레드에서 발생하는 모든 로그에 포함

        log.atInfo()
            .addKeyValue("event", "REQUEST")
            .addKeyValue("httpMethod", request.getMethod())
            .addKeyValue("requestUri", request.getRequestURI())
            .addKeyValue("ip", getClientIp(request))
            .addKeyValue("userAgent", getUserAgent(request))
            .log();
        return true;
    }

    private String extractTraceId(HttpServletRequest request) {
        String traceId = request.getHeader(TRACE_ID_HEADER);
        if (traceId == null) {
            return randomCodeGenerator.generate(TRACE_ID_LENGTH);
        }
        return traceId;
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
        if (request.getMethod().equals("POST")) { // requestBody 로깅
            logRequestBody(request);
        }

        Long startTime = (Long)request.getAttribute("com.forgather.startTime");
        long durationMillis = (startTime != null) ? (System.currentTimeMillis() - startTime) : -1;

        log.atInfo()
            .addKeyValue("event", "RESPONSE")
            .addKeyValue("duration", durationMillis + "ms")
            .log();

        setTraceIdHeader(response);
        MDC.clear(); // 쓰레드 종료 시 MDC 초기화
    }

    private void logRequestBody(HttpServletRequest request) {
        try {
            byte[] bytes = request.getInputStream().readAllBytes();
            log.atInfo()
                .addMarker(BODY_MARKER)
                .log("\n{}", new String(bytes));
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    private void setTraceIdHeader(HttpServletResponse response) {
        String formattedTraceId = MDC.get(MDC_TRACE_ID_KEY);
        String traceId = formattedTraceId.substring(1, TRACE_ID_LENGTH + 1);
        response.setHeader(TRACE_ID_HEADER, traceId);
    }
}
