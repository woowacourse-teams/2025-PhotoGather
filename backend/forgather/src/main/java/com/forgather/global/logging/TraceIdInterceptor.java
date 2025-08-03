package com.forgather.global.logging;

import java.util.UUID;

import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Component
@Slf4j
@RequiredArgsConstructor
public class TraceIdInterceptor implements HandlerInterceptor {

    private static final int TRACE_ID_LENGTH = 8;

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws
        Exception {
        String traceId = UUID.randomUUID().toString().substring(0, TRACE_ID_LENGTH).replace("-", "");
        request.setAttribute("com.forgather.traceId", traceId);
        return HandlerInterceptor.super.preHandle(request, response, handler);
    }
}
