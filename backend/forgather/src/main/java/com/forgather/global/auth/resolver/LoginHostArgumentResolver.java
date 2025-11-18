package com.forgather.global.auth.resolver;

import java.util.Objects;

import org.springframework.core.MethodParameter;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.support.WebDataBinderFactory;
import org.springframework.web.context.request.NativeWebRequest;
import org.springframework.web.method.support.HandlerMethodArgumentResolver;
import org.springframework.web.method.support.ModelAndViewContainer;

import com.forgather.domain.space.repository.HostRepository;
import com.forgather.global.auth.annotation.LoginHost;
import com.forgather.global.auth.model.Host;
import com.forgather.global.auth.util.JwtTokenProvider;
import com.forgather.global.exception.UnauthorizedException;

import io.jsonwebtoken.JwtException;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class LoginHostArgumentResolver implements HandlerMethodArgumentResolver {

    private static final String BEARER = "Bearer ";
    private static final String AUTHORIZATION_HEADER_NAME = "Authorization";

    private final JwtTokenProvider jwtTokenProvider;
    private final HostRepository hostRepository;

    @Override
    public boolean supportsParameter(MethodParameter parameter) {
        return parameter.hasParameterAnnotation(LoginHost.class);
    }

    @Override
    public Host resolveArgument(MethodParameter parameter, ModelAndViewContainer mavContainer,
        NativeWebRequest webRequest, WebDataBinderFactory binderFactory) throws Exception {
        LoginHost annotation = parameter.getParameterAnnotation(LoginHost.class);
        boolean required = Objects.requireNonNull(annotation).required();
        HttpServletRequest request = (HttpServletRequest) webRequest.getNativeRequest();

        String jwtToken = request.getHeader(AUTHORIZATION_HEADER_NAME);
        if (jwtToken == null) {
            throwExceptionIfRequired(required);
            return null;
        }
        if (!jwtToken.startsWith(BEARER)) {
            throw new JwtException("Invalid JWT token format");
        }

        jwtToken = jwtToken.substring(BEARER.length());
        jwtTokenProvider.validateToken(jwtToken);

        Long hostId = jwtTokenProvider.getHostId(jwtToken);
        return hostRepository.getByIdOrThrow(hostId);
    }

    private void throwExceptionIfRequired(boolean required) {
        if (required) {
            throw new UnauthorizedException("로그인이 필요합니다.");
        }
    }
}
