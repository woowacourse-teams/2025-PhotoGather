package com.forgather.global.auth.controller;

import java.net.URI;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.forgather.global.auth.annotation.HostId;
import com.forgather.global.auth.dto.HostResponse;
import com.forgather.global.auth.dto.KakaoLoginUrlResponse;
import com.forgather.global.auth.service.AuthService;
import com.forgather.global.config.LoginProperties;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
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
    private final LoginProperties loginProperties;

    @GetMapping("/me")
    @Operation(summary = "로그인 상태 확인",
        description = "현재 로그인된 사용자의 정보를 확인합니다. " +
            "로그인된 사용자가 없으면 401 Unauthorized를 반환합니다.")
    public ResponseEntity<HostResponse> getCurrentUser(
        @HostId Long hostId
    ) {
        try {
            var response = authService.getCurrentUser(hostId);
            return ResponseEntity.ok(response);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }

    @GetMapping("/login/kakao")
    @Operation(summary = "Kakao 로그인 URL 요청",
        description = "Kakao 로그인 페이지로 리다이렉트하기 위한 URL을 반환합니다.")
    public ResponseEntity<KakaoLoginUrlResponse> getKakaoLoginUrl(
        @RequestParam(name = "url", required = false) String customUrl
    ) {
        var response = authService.getKakaoLoginUrl(customUrl);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/login/kakao/callback")
    @Operation(summary = "Kakao 로그인 콜백",
        description = "Kakao 로그인 후 리다이렉트되는 URL에서 authorization code를 받아 로그인 처리를 합니다.")
    public ResponseEntity<Void> kakaoLoginCallback(
        @RequestParam(name = "code") String authorizationCode,
        @RequestParam(name = "url", required = false) String customUrl,
        HttpServletResponse httpServletResponse,
        HttpSession session
    ) {
        HttpHeaders headers = new HttpHeaders();
        try {
            var response = authService.requestKakaoLoginToken(authorizationCode, customUrl);
            session.setAttribute("host_id", response.hostId());
            ResponseCookie refreshToken = createRefreshCookie(response.refreshToken(), response.expirationDays());
            httpServletResponse.addHeader(HttpHeaders.SET_COOKIE, refreshToken.toString());
            headers.setLocation(URI.create(loginProperties.getCallbackSuccessUrl(customUrl)));
        } catch (Exception e) {
            headers.setLocation(URI.create(loginProperties.getCallbackFailureUrl(customUrl)));
        }
        return new ResponseEntity<>(headers, HttpStatus.FOUND);
    }

    @PostMapping("/logout/kakao")
    @Operation(summary = "로그아웃",
        description = "로그아웃합니다. 리프레시 토큰을 쿠키에서 제거하고, 서버에서 해당 토큰을 삭제합니다.")
    public ResponseEntity<Void> logout(
        @Parameter(hidden = true)
        @CookieValue(name = "refresh_token", required = false) String refreshToken,
        HttpServletResponse httpServletResponse,
        HttpSession session
    ) {
        session.removeAttribute("host_id");
        authService.logout(refreshToken);
        ResponseCookie cookie = ResponseCookie.from("refresh_token", "")
            .httpOnly(true)
            .secure(true)
            .sameSite("Strict")
            .path("/auth")
            .maxAge(0)
            .build();

        httpServletResponse.addHeader(HttpHeaders.SET_COOKIE, cookie.toString());
        return ResponseEntity.ok().build();
    }

    @PostMapping("/refresh")
    @Operation(summary = "로그인 세션 갱신",
        description = "리프레시 토큰을 사용하여 로그인 세션을 갱신합니다. " +
            "로그인 이력이 있다면 재로그인 없이 로그인 세션을 갱신할 수 있습니다.")
    public ResponseEntity<Void> refreshLoginSession(
        @Parameter(hidden = true)
        @CookieValue(name = "refresh_token") String refreshToken,
        HttpServletResponse httpServletResponse,
        HttpSession session
    ) {
        var response = authService.refresh(refreshToken);
        session.setAttribute("host_id", response.hostId());
        ResponseCookie newRefreshToken = createRefreshCookie(refreshToken, response.expirationDays());
        httpServletResponse.addHeader(HttpHeaders.SET_COOKIE, newRefreshToken.toString());
        return ResponseEntity.ok().build();
    }

    private ResponseCookie createRefreshCookie(String refreshTokenValue, long expirationDays) {
        ResponseCookie refreshToken = ResponseCookie.from("refresh_token", refreshTokenValue)
            .httpOnly(true)
            .secure(true)
            .sameSite("Strict")
            .path("/auth")
            .maxAge(60 * 60 * 24 * expirationDays)
            .build();

        return refreshToken;
    }
}
