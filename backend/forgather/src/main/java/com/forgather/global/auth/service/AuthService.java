package com.forgather.global.auth.service;

import org.springframework.stereotype.Service;

import com.forgather.global.auth.client.KakaoAuthClient;
import com.forgather.global.auth.client.KakaoLoginTokenDto;
import com.forgather.global.auth.domain.KakaoHost;
import com.forgather.global.auth.dto.KakaoLoginCallbackResponse;
import com.forgather.global.auth.repository.HostRepository;
import com.forgather.global.auth.util.JwtParser;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final JwtParser jwtParser;
    private final KakaoAuthClient kakaoAuthClient;
    private final HostRepository hostRepository;

    public String getKakaoLoginUrl() {
        return kakaoAuthClient.getKakaoLoginUrl();
    }

    @Transactional
    public KakaoLoginCallbackResponse requestKakaoLoginToken(String authorizationCode) {
        KakaoLoginTokenDto.KakaoLoginTokenResponse response = kakaoAuthClient.requestKakaoLoginToken(authorizationCode);
        KakaoLoginTokenDto.UserInfo userInfo = jwtParser.parseIdToken(response.idToken());
        KakaoHost kakaoHost = new KakaoHost(
            userInfo.nickname(),
            userInfo.sub(),
            response.accessToken(),
            response.refreshToken(),
            userInfo.picture()
        );
        hostRepository.save(kakaoHost);
        return KakaoLoginCallbackResponse.from(kakaoHost);
    }

    @Transactional
    public void logoutKakao(String accessToken) {
        KakaoHost host = (KakaoHost)hostRepository.getHostByAccessToken(accessToken);
        kakaoAuthClient.logoutKakao(host);
        host.logout();
    }
}
