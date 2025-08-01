package com.forgather.global.auth.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.forgather.global.auth.dto.KakaoLoginCallbackResponse;
import com.forgather.global.auth.dto.KakaoLoginUrlResponse;
import com.forgather.global.auth.service.AuthService;

import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
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
    public ResponseEntity<KakaoLoginCallbackResponse> kakaoLoginCallback(
        @RequestParam(name = "code") String authorizationCode
    ) {
        var response = authService.requestKakaoLoginToken(authorizationCode);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/logout/kakao")
    @Operation(summary = "Kakao 로그아웃",
        description = "Kakao 로그아웃을 수행하고, 해당 사용자의 세션을 종료합니다.")
    public ResponseEntity<Void> kakaoLogout(String accessToken) {
        authService.logoutKakao(accessToken);
        return ResponseEntity.ok().build();
    }
}
