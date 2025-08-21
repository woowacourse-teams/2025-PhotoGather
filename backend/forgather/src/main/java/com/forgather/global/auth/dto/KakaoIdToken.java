package com.forgather.global.auth.dto;

import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;

@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
public record KakaoIdToken(
    // ID 토큰이 발급된 앱의 앱 키 (문자열 또는 배열)
    Object aud,

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
