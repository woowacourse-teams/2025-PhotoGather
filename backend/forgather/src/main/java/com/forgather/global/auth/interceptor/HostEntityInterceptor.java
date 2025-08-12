package com.forgather.global.auth.interceptor;

import org.springframework.stereotype.Component;
import org.springframework.web.method.HandlerMethod;
import org.springframework.web.servlet.HandlerInterceptor;

import com.forgather.domain.space.repository.HostRepository;
import com.forgather.global.auth.domain.Host;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class HostEntityInterceptor implements HandlerInterceptor {

    private final HostRepository hostRepository;

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws
        Exception {
        if (!(handler instanceof HandlerMethod)) {
            return true;
        }

        HttpSession session = request.getSession(false);
        if (session == null) {
            return true;
        }

        Long hostId = (Long)session.getAttribute("host_id");
        if (hostId == null) {
            return true;
        }

        Host host = hostRepository.getById(hostId);
        request.setAttribute("host", host);
        return true;
    }
}
