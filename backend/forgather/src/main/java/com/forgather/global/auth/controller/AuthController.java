package com.forgather.global.auth.controller;

import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.forgather.global.auth.dto.KakaoLoginUrlResponse;
import com.forgather.global.auth.service.AuthService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@Tag(name = "Auth: 인증", description = "인증 관련 API")
@RequestMapping("/auth")
public class AuthController {

    private final AuthService authService;

    @GetMapping("/login/kakao")
    @Operation(summary = "Kakao 로그인 URL 요청",
        description = "Kakao 로그인 페이지로 리다이렉트하기 위한 URL을 반환합니다.")
    public ResponseEntity<KakaoLoginUrlResponse> getKakaoLoginUrl() {
        var response = authService.getKakaoLoginUrl();
        return ResponseEntity.ok(response);
    }

    @GetMapping("/login/kakao/callback")
    @Operation(summary = "Kakao 로그인 콜백",
        description = "Kakao 로그인 후 리다이렉트되는 URL에서 authorization code를 받아 로그인 처리를 합니다.")
    public ResponseEntity<Void> kakaoLoginCallback(
        @RequestParam(name = "code") String authorizationCode,
        HttpServletResponse httpServletResponse,
        HttpSession session
    ) {
        var response = authService.requestKakaoLoginToken(authorizationCode);
        session.setAttribute("host_id", response.hostId());

        ResponseCookie refreshToken = ResponseCookie.from("refresh_token", response.refreshToken())
            .httpOnly(true)
            .secure(true)
            .sameSite("Strict")
            .path("/auth")
            .maxAge(60 * 60 * 24 * response.expirationDays())
            .build();

        httpServletResponse.addHeader(HttpHeaders.SET_COOKIE, refreshToken.toString());
        return ResponseEntity.ok().build();
    }

    @PostMapping("/logout/kakao")
    @Operation(summary = "Kakao 로그아웃",
        description = "Kakao 로그아웃을 수행하고, 해당 사용자의 세션을 종료합니다.")
    public ResponseEntity<Void> kakaoLogout(
        @CookieValue(name = "refresh_token") String refreshToken,
        HttpSession session
    ) {
        /**
         * TODO
         * 리프레시 토큰 기반으로 잘 로그아웃하는지 체크. row 제거되야함.
         */
        String hostId = session.getAttribute("host_id").toString();
        authService.logoutKakao(hostId, refreshToken);
        return ResponseEntity.ok().build();
    }
}
