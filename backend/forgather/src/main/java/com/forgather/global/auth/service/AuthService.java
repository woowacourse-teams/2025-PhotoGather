package com.forgather.global.auth.service;

import java.util.Optional;

import org.springframework.stereotype.Service;

import com.forgather.global.auth.client.KakaoAuthClient;
import com.forgather.global.auth.client.KakaoTokenDto;
import com.forgather.global.auth.dto.HostResponse;
import com.forgather.global.auth.dto.KakaoLoginUrlResponse;
import com.forgather.global.auth.dto.LoginResponse;
import com.forgather.global.auth.model.Host;
import com.forgather.global.auth.model.KakaoHost;
import com.forgather.global.auth.repository.KakaoHostRepository;
import com.forgather.global.auth.repository.RefreshTokenRepository;
import com.forgather.global.auth.util.JwtParser;
import com.forgather.global.auth.util.JwtTokenProvider;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final JwtParser jwtParser;
    private final JwtTokenProvider jwtTokenProvider;
    private final KakaoAuthClient kakaoAuthClient;
    private final KakaoHostRepository kakaoHostRepository;
    private final RefreshTokenRepository refreshTokenRepository;

    public KakaoLoginUrlResponse getKakaoLoginUrl() {
        String kakaoLoginUrl = kakaoAuthClient.getKakaoLoginUrl();
        return KakaoLoginUrlResponse.from(kakaoLoginUrl);
    }

    @Transactional
    public LoginResponse requestKakaoLoginToken(String authorizationCode) {
        KakaoTokenDto.FullToken response = kakaoAuthClient.requestKakaoLoginToken(authorizationCode);
        KakaoHost kakaoHost = loginWithKakao(response);
        String accessToken = jwtTokenProvider.generateAccessToken(kakaoHost.getHost().getId());
        String refreshToken= jwtTokenProvider.generateRefreshToken(kakaoHost.getHost().getId());
        return LoginResponse.of(accessToken, refreshToken);
    }

    private KakaoHost loginWithKakao(KakaoTokenDto.FullToken response) {
        KakaoTokenDto.IdToken idToken = jwtParser.parseIdToken(response.idToken());
        Optional<KakaoHost> kakaoHost = kakaoHostRepository.findByUserId(idToken.sub());
        Host host = new Host(idToken.nickname(), idToken.picture());

        return kakaoHost.orElseGet(() -> kakaoHostRepository.save(new KakaoHost(host, idToken.sub())));
    }

    public LoginResponse refresh(String refreshToken) {
        jwtTokenProvider.validateToken(refreshToken);
        Long hostId = jwtTokenProvider.getHostId(refreshToken);
        KakaoHost kakaoHost = kakaoHostRepository.getById(hostId);
        String accessToken = jwtTokenProvider.generateAccessToken(kakaoHost.getHost().getId());
        return LoginResponse.of(accessToken, refreshToken);
    }

    public HostResponse getCurrentUser(Long hostId) {
        KakaoHost kakaoHost = kakaoHostRepository.getById(hostId);
        return HostResponse.from(kakaoHost.getHost());
    }
}
