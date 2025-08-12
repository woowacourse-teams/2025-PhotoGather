package com.forgather.global.auth.interceptor;

import java.util.Map;

import org.springframework.stereotype.Component;
import org.springframework.web.method.HandlerMethod;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.HandlerMapping;

import com.forgather.domain.space.model.Space;
import com.forgather.domain.space.repository.SpaceRepository;
import com.forgather.global.auth.annotation.SpaceOwner;
import com.forgather.global.auth.domain.Host;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class HostOwnerInterceptor implements HandlerInterceptor {

    private final SpaceRepository spaceRepository;

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws
        Exception {
        if (!(handler instanceof HandlerMethod)) {
            // 정적 리소스 요청
            return true;
        }

        HandlerMethod handlerMethod = (HandlerMethod)handler;
        SpaceOwner spaceOwner = handlerMethod.getMethodAnnotation(SpaceOwner.class);
        if (spaceOwner == null) {
            // 스페이스 소유자 권한이 필요하지 않은 경우(SpaceOwner 어노테이션이 없는 경우)
            return true;
        }

        String spaceCodeFieldName = spaceOwner.pathVariableName();
        @SuppressWarnings("unchecked")
        Map<String, String> pathVariables = (Map<String, String>)request.getAttribute(
            HandlerMapping.URI_TEMPLATE_VARIABLES_ATTRIBUTE);

        String spaceCode = pathVariables.get(spaceCodeFieldName);
        if (spaceCode == null) {
            response.sendError(HttpServletResponse.SC_BAD_REQUEST, "스페이스 코드가 누락되었습니다.");
            return false;
        }

        Space space = spaceRepository.getByCode(spaceCode);
        Host host = (Host)request.getAttribute("host");
        space.validateHost(host);
        return true;
    }
}
