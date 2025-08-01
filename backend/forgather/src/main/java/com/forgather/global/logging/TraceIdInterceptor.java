package com.forgather.global.logging;

import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

import com.forgather.domain.space.util.RandomCodeGenerator;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Component
@Slf4j
@RequiredArgsConstructor
public class TraceIdInterceptor implements HandlerInterceptor {

    private final RandomCodeGenerator randomCodeGenerator;

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws
        Exception {
        String traceId = randomCodeGenerator.generate(4);
        request.setAttribute("com.forgather.traceId", traceId);
        return HandlerInterceptor.super.preHandle(request, response, handler);
    }
}
