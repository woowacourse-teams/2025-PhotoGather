package com.forgather.global.auth.client;

import static com.fasterxml.jackson.databind.PropertyNamingStrategies.SnakeCaseStrategy;

import com.fasterxml.jackson.databind.annotation.JsonNaming;

public class KakaoLoginTokenDto {

    @JsonNaming(SnakeCaseStrategy.class)
    public record KakaoLoginTokenRequest(
        String grantType,
        String clientId,
        String redirectUri,
        String code
    ) {
    }

    @JsonNaming(SnakeCaseStrategy.class)
    public record KakaoLoginTokenResponse(
        // 사용자 액세스 토큰 값
        String accessToken,

        // 토큰 타입, bearer로 고정
        String tokenType,

        // 사용자 리프레시 토큰 값
        String refreshToken,

        // ID 토큰. Base64 인코딩 된 사용자 인증 정보 포함
        String idToken,

        // 액세스 토큰과 ID 토큰의 만료 시간(초)
        Long expiresIn,

        // 인증된 사용자의 정보 조회 권한 범위
        String scope,

        // 리프레시 토큰 만료 시간(초)
        String refreshTokenExpiresIn
    ) {
    }

    @JsonNaming(SnakeCaseStrategy.class)
    public record UserInfo(
        // ID 토큰이 발급된 앱의 앱 키
        String aud,

        // ID 토큰에 해당하는 사용자의 회원번호
        String sub,

        // 사용자가 카카오 로그인으로 인증을 완료한 시각
        Long authTime,

        // ID 토큰을 발급한 인증 기관 정보
        String iss,

        // 닉네임
        String nickname,

        // ID 토큰 만료 시간
        Long exp,

        // ID 토큰 발급 또는 갱신 시각
        Long iat,

        // 프로필 미리보기 이미지 URL
        String picture
    ) {
    }
}
