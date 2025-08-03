package com.forgather.global.auth.service;

import java.time.LocalDateTime;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.forgather.global.auth.client.KakaoAuthClient;
import com.forgather.global.auth.client.KakaoLoginTokenDto;
import com.forgather.global.auth.domain.KakaoHost;
import com.forgather.global.auth.domain.RefreshToken;
import com.forgather.global.auth.dto.KakaoLoginUrlResponse;
import com.forgather.global.auth.dto.LoginResponse;
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
     * <p>
     * 1. 세션에 사용자 아이디 삽입 - Httponly, Secure, SameSite, TTL
     * 2. DB에 리프레시토큰 삽입 - KakaoHostRepository.save()
     * 3. 바디에 리프레시토큰 삽입 - KakaoLoginCallbackResponse.from()
     * 4. host 테이블로 picture_url 이동
     * 5. 스케줄러로 만료된 리프레시 토큰 삭제
     * 6. redirect_uri 카카오 디벨로퍼에서 수정. auth 경로 추가
     * 7. 카카오의 리프레시 토큰과 액세스 토큰은 서버에 저장하지 않음
     * <p>
     * 7. 리프레시 api
     * <p>
     * 0. 로그인 필요한 api에서 검증 로직 추가 필요
     */

    @Transactional
    public LoginResponse requestKakaoLoginToken(String authorizationCode) {
        KakaoLoginTokenDto.KakaoLoginTokenResponse response = kakaoAuthClient.requestKakaoLoginToken(authorizationCode);
        KakaoLoginTokenDto.UserInfo userInfo = jwtParser.parseIdToken(response.idToken());
        KakaoHost kakaoHost = loginWithKakao(response, userInfo);

        RefreshToken refreshToken = RefreshToken.generate(kakaoHost, randomCodeGenerator);
        refreshTokenRepository.save(refreshToken);

        return LoginResponse.of(kakaoHost, refreshToken);
    }

    private KakaoHost loginWithKakao(KakaoLoginTokenDto.KakaoLoginTokenResponse response,
        KakaoLoginTokenDto.UserInfo userInfo) {
        Optional<KakaoHost> kakaoHost = kakaoHostRepository.findByUserId(userInfo.sub());
        return kakaoHost.orElseGet(() -> kakaoHostRepository.save(
            new KakaoHost(
                userInfo.nickname(),
                userInfo.picture(),
                userInfo.sub()
            )));
    }

    @Transactional
    public void logout(String refreshToken) {
        refreshTokenRepository.findByToken(refreshToken)
            .ifPresent(refreshTokenRepository::delete);
    }

    @Transactional
    public void removeExpiredRefreshTokens() {
        refreshTokenRepository.deleteAllByExpiredBefore(LocalDateTime.now());
    }

    public LoginResponse refreshLoginSession(String refreshTokenStr) {
        RefreshToken refreshToken = refreshTokenRepository.getByToken(refreshTokenStr);
        if (refreshToken.isExpired()) {
            throw new IllegalArgumentException("리프레시 토큰이 만료되었습니다.");
        }
        return LoginResponse.of(refreshToken.getHost(), refreshToken);
    }
}
