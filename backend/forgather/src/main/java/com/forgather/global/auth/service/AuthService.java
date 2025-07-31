package com.forgather.global.auth.service;

import java.util.Optional;

import org.springframework.stereotype.Service;

import com.forgather.global.auth.client.KakaoAuthClient;
import com.forgather.global.auth.client.KakaoLoginTokenDto;
import com.forgather.global.auth.domain.KakaoHost;
import com.forgather.global.auth.dto.KakaoLoginCallbackResponse;
import com.forgather.global.auth.repository.KakaoHostRepository;
import com.forgather.global.auth.util.JwtParser;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final JwtParser jwtParser;
    private final KakaoAuthClient kakaoAuthClient;
    private final KakaoHostRepository kakaoHostRepository;

    public String getKakaoLoginUrl() {
        return kakaoAuthClient.getKakaoLoginUrl();
    }

    @Transactional
    public KakaoLoginCallbackResponse requestKakaoLoginToken(String authorizationCode) {
        KakaoLoginTokenDto.KakaoLoginTokenResponse response = kakaoAuthClient.requestKakaoLoginToken(authorizationCode);
        KakaoLoginTokenDto.UserInfo userInfo = jwtParser.parseIdToken(response.idToken());
        KakaoHost kakaoHost = loginWithKakao(response, userInfo);

        return KakaoLoginCallbackResponse.from(kakaoHost);
    }

    private KakaoHost loginWithKakao(KakaoLoginTokenDto.KakaoLoginTokenResponse response,
        KakaoLoginTokenDto.UserInfo userInfo) {
        Optional<KakaoHost> kakaoHost = kakaoHostRepository.findByUserId(userInfo.sub());
        if (kakaoHost.isPresent()) {
            kakaoHost.get().updateLoginTokens(response.accessToken(), response.refreshToken());
            return kakaoHost.get();
        }

        return kakaoHostRepository.save(
            new KakaoHost(
                userInfo.nickname(),
                userInfo.sub(),
                response.accessToken(),
                response.refreshToken(),
                userInfo.picture()
            ));
    }

    @Transactional
    public void logoutKakao(String accessToken) {
        KakaoHost host = (KakaoHost)kakaoHostRepository.getHostByAccessToken(accessToken);
        kakaoAuthClient.logoutKakao(host);
        host.logout();
    }
}
