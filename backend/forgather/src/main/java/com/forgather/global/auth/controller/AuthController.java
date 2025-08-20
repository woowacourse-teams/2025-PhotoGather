package com.forgather.global.auth.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.forgather.global.auth.annotation.LoginHost;
import com.forgather.global.auth.dto.HostResponse;
import com.forgather.global.auth.dto.KakaoLoginConfirmRequest;
import com.forgather.global.auth.dto.KakaoLoginTokenResponse;
import com.forgather.global.auth.dto.LoginResponse;
import com.forgather.global.auth.dto.RefreshRequest;
import com.forgather.global.auth.model.Host;
import com.forgather.global.auth.service.AuthService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@Tag(name = "Auth: 인증", description = "인증 관련 API")
@RequestMapping("/auth")
public class AuthController {

    private final AuthService authService;

    @GetMapping("/me")
    @Operation(summary = "로그인 상태 확인",
        description = "현재 로그인된 사용자의 정보를 확인합니다. " +
            "로그인된 사용자가 없으면 401 Unauthorized를 반환합니다.")
    public ResponseEntity<HostResponse> getCurrentUser(@LoginHost Host host) {
        try {
            var response = authService.getCurrentUser(host);
            return ResponseEntity.ok(response);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }

    @GetMapping("/login/kakao")
    @Operation(summary = "Kakao 로그인을 위한 토큰 발급",
        description = "Kakao 로그인 페이지로 리다이렉트하기 위한 URL을 반환합니다.")
    public ResponseEntity<KakaoLoginTokenResponse> getKakaoLoginToken() {
        var response = authService.getKakaoLoginToken();
        return ResponseEntity.ok(response);
    }

    @PostMapping("/login/kakao/confirm")
    @Operation(summary = "Kakao 로그인 완료",
        description = "Kakao 로그인 후 발급받은 액세스토큰을 전달하여 로그인합니다. " +
            "로그인 성공 시, 액세스토큰과 리프레시토큰을 반환합니다.")
    public ResponseEntity<LoginResponse> kakaoLoginConfirm(
        @RequestBody KakaoLoginConfirmRequest request
    ) {
        var response = authService.kakaoLoginConfirm(request);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/refresh")
    @Operation(summary = "로그인 세션 갱신",
        description = "리프레시 토큰을 사용하여 로그인 세션을 갱신합니다. " +
            "로그인 이력이 있다면 재로그인 없이 로그인 세션을 갱신할 수 있습니다.")
    public ResponseEntity<LoginResponse> refresh(
        @RequestBody RefreshRequest request
    ) {
        var response = authService.refresh(request.refreshToken());
        return ResponseEntity.ok(response);
    }
}
