package com.forgather.global.auth.resolver;

import java.util.Objects;

import org.springframework.core.MethodParameter;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.support.WebDataBinderFactory;
import org.springframework.web.context.request.NativeWebRequest;
import org.springframework.web.method.support.HandlerMethodArgumentResolver;
import org.springframework.web.method.support.ModelAndViewContainer;

import com.forgather.domain.space.repository.HostRepository;
import com.forgather.global.auth.annotation.SessionHost;
import com.forgather.global.auth.domain.Host;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class SessionHostArgumentResolver implements HandlerMethodArgumentResolver {

    private final HostRepository hostRepository;

    @Override
    public boolean supportsParameter(MethodParameter parameter) {
        return parameter.hasParameterAnnotation(SessionHost.class);
    }

    @Override
    public Host resolveArgument(MethodParameter parameter, ModelAndViewContainer mavContainer,
        NativeWebRequest webRequest, WebDataBinderFactory binderFactory) throws Exception {

        SessionHost annotation = parameter.getParameterAnnotation(SessionHost.class);
        boolean required = Objects.requireNonNull(annotation).required();
        HttpServletRequest request = webRequest.getNativeRequest(HttpServletRequest.class);
        if (request == null) {
            throwExceptionIfRequired(required);
            return null;
        }

        HttpSession session = request.getSession(false);
        if (session == null) {
            throwExceptionIfRequired(required);
            return null;
        }

        Long hostId = (Long)session.getAttribute("host_id");
        if (hostId == null) {
            throwExceptionIfRequired(required);
            return null;
        }

        return hostRepository.getById(hostId);
    }

    private void throwExceptionIfRequired(boolean required) {
        if (required) {
            throw new IllegalArgumentException("로그인 정보를 찾을 수 없습니다. 세션이 만료되었거나 로그인하지 않았습니다.");
        }
    }
}
