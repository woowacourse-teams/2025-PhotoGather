package com.forgather.global.auth.service;

import java.time.LocalDateTime;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.forgather.global.auth.client.KakaoAuthClient;
import com.forgather.global.auth.client.KakaoTokenDto;
import com.forgather.global.auth.domain.Host;
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

    @Transactional
    public LoginResponse requestKakaoLoginToken(String authorizationCode) {
        KakaoTokenDto.FullToken response = kakaoAuthClient.requestKakaoLoginToken(authorizationCode);
        KakaoHost kakaoHost = loginWithKakao(response);
        RefreshToken refreshToken = RefreshToken.generate(kakaoHost.getHost(), randomCodeGenerator);
        refreshTokenRepository.save(refreshToken);

        return LoginResponse.of(kakaoHost.getHost(), refreshToken);
    }

    private KakaoHost loginWithKakao(KakaoTokenDto.FullToken response) {
        KakaoTokenDto.IdToken idToken = jwtParser.parseIdToken(response.idToken());
        Optional<KakaoHost> kakaoHost = kakaoHostRepository.findByUserId(idToken.sub());
        Host host = new Host(idToken.nickname(), idToken.picture());

        return kakaoHost.orElseGet(() -> kakaoHostRepository.save(new KakaoHost(host, idToken.sub())));
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
        if (refreshToken.isExpired(LocalDateTime.now())) {
            throw new IllegalArgumentException("리프레시 토큰이 만료되었습니다.");
        }
        return LoginResponse.of(refreshToken.getHost(), refreshToken);
    }
}
