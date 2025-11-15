package com.forgather.back_office.interceptor;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

import com.forgather.global.auth.util.JwtTokenProvider;

import io.jsonwebtoken.JwtException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Component
@Slf4j
@RequiredArgsConstructor
public class AdminAuthInterceptor implements HandlerInterceptor {

    private static final String BEARER = "Bearer ";
    private static final String AUTHORIZATION_HEADER_NAME = "Authorization";
    private static final String ADMIN_ROLE = "ADMIN";

    private final JwtTokenProvider jwtTokenProvider;

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) {
        String jwtToken = request.getHeader(AUTHORIZATION_HEADER_NAME);

        if (jwtToken == null || jwtToken.isBlank()) {
            log.info("어드민 페이지 접근 시도 - Authorization 헤더 없음: {}", request.getRequestURI());
            handleUnauthorized(request, response);
            return false;
        }

        if (!jwtToken.startsWith(BEARER)) {
            log.info("어드민 페이지 접근 시도 - 잘못된 토큰 형식: {}", request.getRequestURI());
            handleUnauthorized(request, response);
            return false;
        }

        jwtToken = jwtToken.substring(BEARER.length());

        try {
            jwtTokenProvider.validateToken(jwtToken);
            String role = jwtTokenProvider.getRole(jwtToken);
            if (!ADMIN_ROLE.equals(role)) {
                log.info("어드민 페이지 접근 시도 - 권한 없음 (role: {}): {}", role, request.getRequestURI());
                handleForbidden(request, response);
                return false;
            }

            Long adminUserId = jwtTokenProvider.getId(jwtToken);
            log.info("어드민 페이지 접근 허용 - adminUserId: {}, URI: {}", adminUserId, request.getRequestURI());
            return true;
        } catch (JwtException e) {
            log.info("어드민 페이지 접근 시도 - 유효하지 않은 토큰: {}", request.getRequestURI(), e);
            handleUnauthorized(request, response);
            return false;
        }
    }

    private void handleUnauthorized(HttpServletRequest request, HttpServletResponse response) {
        response.setStatus(HttpStatus.UNAUTHORIZED.value());
        if (!isApiRequest(request)) {
            redirectToLogin(response);
        }
    }

    private void handleForbidden(HttpServletRequest request, HttpServletResponse response) {
        response.setStatus(HttpStatus.FORBIDDEN.value());
        if (!isApiRequest(request)) {
            redirectToLogin(response);
        }
    }

    private boolean isApiRequest(HttpServletRequest request) {
        return request.getRequestURI()
            .startsWith("/api/");
    }

    private void redirectToLogin(HttpServletResponse response) {
        try {
            response.sendRedirect("/admin/login");
        } catch (Exception e) {
            log.error("로그인 페이지 리다이렉트 실패", e);
        }
    }
}
