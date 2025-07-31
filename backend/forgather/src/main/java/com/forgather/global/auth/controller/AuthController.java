package com.forgather.global.auth.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.forgather.global.auth.dto.KakaoLoginCallbackResponse;
import com.forgather.global.auth.service.AuthService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @GetMapping("/login/kakao")
    public ResponseEntity<String> getKakaoLoginUrl() {
        var response = authService.getKakaoLoginUrl();
        return ResponseEntity.ok(response);
    }

    @GetMapping("/login/kakao/callback")
    public ResponseEntity<KakaoLoginCallbackResponse> kakaoLoginCallback(
        @RequestParam(name = "code") String authorizationCode
    ) {
        var response = authService.requestKakaoLoginToken(authorizationCode);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/logout/kakao")
    public ResponseEntity<Void> kakaoLogout(String accessToken) {
        authService.logoutKakao(accessToken);
        return ResponseEntity.ok().build();
    }
}
