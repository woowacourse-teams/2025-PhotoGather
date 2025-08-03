package com.forgather.global.auth.client;

import org.springframework.stereotype.Component;
import org.springframework.web.client.RestClient;

import com.forgather.global.config.KakaoProperties;

import lombok.RequiredArgsConstructor;

/**
 * 카카오 인증 관련 클라이언트
 * https://developers.kakao.com/docs/latest/ko/kakaologin/rest-api#request-token
 */
@Component
@RequiredArgsConstructor
public class KakaoAuthClient {

    private final RestClient restClient;
    private final KakaoProperties kakaoProperties;

    public String getKakaoLoginUrl() {
        StringBuilder urlBuilder = new StringBuilder("https://kauth.kakao.com/oauth/authorize");
        urlBuilder.append("?client_id=").append(kakaoProperties.getClientId());
        urlBuilder.append("&redirect_uri=").append(kakaoProperties.getRedirectUri());
        urlBuilder.append("&response_type=code");
        return urlBuilder.toString();
    }

    public KakaoLoginTokenDto.KakaoLoginTokenResponse requestKakaoLoginToken(String authorizationCode) {
        StringBuilder urlBuilder = new StringBuilder("https://kauth.kakao.com/oauth/token");
        urlBuilder.append("?grant_type=authorization_code");
        urlBuilder.append("&client_id=").append(kakaoProperties.getClientId());
        urlBuilder.append("&redirect_uri=").append(kakaoProperties.getRedirectUri());
        urlBuilder.append("&code=").append(authorizationCode);

        return restClient.post()
                .uri(urlBuilder.toString())
                .retrieve()
                .body(KakaoLoginTokenDto.KakaoLoginTokenResponse.class);
    }
}
