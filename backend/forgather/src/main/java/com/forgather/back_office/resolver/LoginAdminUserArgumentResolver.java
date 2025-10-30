package com.forgather.back_office.resolver;

import org.springframework.core.MethodParameter;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.support.WebDataBinderFactory;
import org.springframework.web.context.request.NativeWebRequest;
import org.springframework.web.method.support.HandlerMethodArgumentResolver;
import org.springframework.web.method.support.ModelAndViewContainer;

import com.forgather.back_office.annotation.Admin;
import com.forgather.back_office.model.AdminUser;
import com.forgather.back_office.repository.AdminUserRepository;
import com.forgather.global.auth.util.JwtTokenProvider;
import com.forgather.global.exception.ForbiddenException;
import com.forgather.global.exception.UnauthorizedException;

import io.jsonwebtoken.JwtException;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class LoginAdminUserArgumentResolver implements HandlerMethodArgumentResolver {

    private static final String BEARER = "Bearer ";
    private static final String AUTHORIZATION_HEADER_NAME = "Authorization";
    private static final String ADMIN = "ADMIN";

    private final JwtTokenProvider jwtTokenProvider;
    private final AdminUserRepository adminUserRepository;

    @Override
    public boolean supportsParameter(MethodParameter parameter) {
        return parameter.hasParameterAnnotation(Admin.class);
    }

    @Override
    public AdminUser resolveArgument(
        MethodParameter parameter,
        ModelAndViewContainer mavContainer,
        NativeWebRequest webRequest,
        WebDataBinderFactory binderFactory
    ) {
        HttpServletRequest request = (HttpServletRequest)webRequest.getNativeRequest();

        String jwtToken = request.getHeader(AUTHORIZATION_HEADER_NAME);
        if (jwtToken == null) {
            throw new UnauthorizedException("로그인이 필요합니다.");
        }
        if (!jwtToken.startsWith(BEARER)) {
            throw new JwtException("유효하지 않은 토큰입니다.");
        }

        jwtToken = jwtToken.substring(BEARER.length());
        jwtTokenProvider.validateToken(jwtToken);

        String role = jwtTokenProvider.getRole(jwtToken);
        if (!ADMIN.equals(role)) {
            throw new ForbiddenException("관리자 권한이 필요합니다.");
        }

        Long adminUserId = jwtTokenProvider.getId(jwtToken);
        return adminUserRepository.getByIdOrThrow(adminUserId);
    }
}

