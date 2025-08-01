package com.forgather.global.auth.service;

import java.time.LocalDateTime;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.forgather.global.auth.client.KakaoAuthClient;
import com.forgather.global.auth.client.KakaoLoginTokenDto;
import com.forgather.global.auth.domain.KakaoHost;
import com.forgather.global.auth.domain.RefreshToken;
import com.forgather.global.auth.dto.KakaoLoginCallbackResponse;
import com.forgather.global.auth.dto.KakaoLoginUrlResponse;
import com.forgather.global.auth.repository.KakaoHostRepository;
import com.forgather.global.auth.repository.RefreshTokenRepository;
import com.forgather.global.auth.util.JwtParser;
import com.forgather.global.util.RandomCodeGenerator;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final JwtParser jwtParser;
    private final KakaoAuthClient kakaoAuthClient;
    private final KakaoHostRepository kakaoHostRepository;
    private final RefreshTokenRepository refreshTokenRepository;
    private final RandomCodeGenerator randomCodeGenerator;

    public KakaoLoginUrlResponse getKakaoLoginUrl() {
        String kakaoLoginUrl = kakaoAuthClient.getKakaoLoginUrl();
        return KakaoLoginUrlResponse.from(kakaoLoginUrl);
    }

    /**
     * TODO
     *
     * 1. 세션에 사용자 아이디 삽입 - Httponly, Secure, SameSite, TTL
     * 2. DB에 리프레시토큰 삽입 - KakaoHostRepository.save()
     * 3. 바디에 리프레시토큰 삽입 - KakaoLoginCallbackResponse.from()
     * 4. host 테이블로 picture_url 이동
     * 5. 스케줄러로 만료된 리프레시 토큰 삭제
     * 6. redirect_uri 카카오 디벨로퍼에서 수정. auth 경로 추가
     *
     *
     * 0.로그인 필요한 서비스에 @LoginRequired 어노테이션 추가
     *
     */

    @Transactional
    public KakaoLoginCallbackResponse requestKakaoLoginToken(String authorizationCode) {
        KakaoLoginTokenDto.KakaoLoginTokenResponse response = kakaoAuthClient.requestKakaoLoginToken(authorizationCode);
        KakaoLoginTokenDto.UserInfo userInfo = jwtParser.parseIdToken(response.idToken());
        KakaoHost kakaoHost = loginWithKakao(response, userInfo);

        RefreshToken refreshToken = RefreshToken.generate(kakaoHost, randomCodeGenerator);
        refreshTokenRepository.save(refreshToken);

        return KakaoLoginCallbackResponse.of(kakaoHost, refreshToken);
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
                userInfo.picture(),
                userInfo.sub(),
                response.accessToken(),
                response.refreshToken()
            ));
    }

    @Transactional
    public void logoutKakao(String userId, String refreshToken) {
        refreshTokenRepository.findByToken(refreshToken)
            .ifPresent(refreshTokenRepository::delete);
        KakaoHost kakaoHost = kakaoHostRepository.getByUserId(userId);
        kakaoAuthClient.logoutKakao(kakaoHost);
        kakaoHost.logout();
    }

    @Transactional
    public void removeExpiredRefreshTokens() {
        refreshTokenRepository.deleteAllByExpiredBefore(LocalDateTime.now());
    }
}
