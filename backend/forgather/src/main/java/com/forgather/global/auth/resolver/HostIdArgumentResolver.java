package com.forgather.global.auth.resolver;

import org.springframework.core.MethodParameter;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.support.WebDataBinderFactory;
import org.springframework.web.context.request.NativeWebRequest;
import org.springframework.web.method.support.HandlerMethodArgumentResolver;
import org.springframework.web.method.support.ModelAndViewContainer;

import com.forgather.global.auth.annotation.HostId;
import com.forgather.global.auth.util.JwtTokenProvider;

import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class HostIdArgumentResolver implements HandlerMethodArgumentResolver {

    private static final String BEARER = "Bearer ";
    private static final String AUTHORIZATION_HEADER_NAME = "Authorization";

    private final JwtTokenProvider jwtTokenProvider;

    @Override
    public boolean supportsParameter(MethodParameter parameter) {
        return parameter.hasParameterAnnotation(HostId.class);
    }

    @Override
    public Long resolveArgument(MethodParameter parameter, ModelAndViewContainer mavContainer,
        NativeWebRequest webRequest, WebDataBinderFactory binderFactory) throws Exception {
        HttpServletRequest request = (HttpServletRequest) webRequest.getNativeRequest();

        String jwtToken = request.getHeader(AUTHORIZATION_HEADER_NAME);
        if (jwtToken == null || !jwtToken.startsWith(BEARER)) {
            throw new IllegalArgumentException("Authorization header is missing or invalid");
        }
        jwtToken = jwtToken.substring(BEARER.length());
        jwtTokenProvider.validateToken(jwtToken);
        return jwtTokenProvider.getUserId(jwtToken);
    }
}
