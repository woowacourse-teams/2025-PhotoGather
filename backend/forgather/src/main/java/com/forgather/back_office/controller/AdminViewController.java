package com.forgather.back_office.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * 백오피스 관리자 페이지를 위한 View Controller
 * Thymeleaf 템플릿을 반환하여 관리자 UI를 제공합니다.
 */
@Controller
@RequestMapping("/admin")
public class AdminViewController {

    /**
     * 관리자 로그인 페이지를 반환합니다.
     *
     * @return 로그인 페이지 템플릿 경로
     */
    @GetMapping("/login")
    public String loginPage() {
        return "admin/login";
    }

    /**
     * Space 목록 관리 페이지를 반환합니다.
     * JWT 토큰 검증은 클라이언트 측에서 수행됩니다.
     *
     * @return Space 목록 페이지 템플릿 경로
     */
    @GetMapping("/spaces")
    public String spacesPage() {
        return "admin/spaces/list";
    }
}
