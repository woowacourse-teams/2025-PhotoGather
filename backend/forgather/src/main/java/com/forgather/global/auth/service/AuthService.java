package com.forgather.global.auth.service;

import java.util.Optional;

import org.springframework.stereotype.Service;

import com.forgather.domain.space.repository.HostRepository;
import com.forgather.global.auth.client.KakaoAuthClient;
import com.forgather.global.auth.dto.HostResponse;
import com.forgather.global.auth.dto.KakaoIdToken;
import com.forgather.global.auth.dto.KakaoLoginConfirmRequest;
import com.forgather.global.auth.dto.KakaoLoginTokenResponse;
import com.forgather.global.auth.dto.LoginResponse;
import com.forgather.global.auth.model.Host;
import com.forgather.global.auth.model.KakaoHost;
import com.forgather.global.auth.repository.KakaoHostRepository;
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
    private final HostRepository hostRepository;

    public KakaoLoginTokenResponse getKakaoLoginToken() {
        return new KakaoLoginTokenResponse(kakaoAuthClient.getKakaoClientId());
    }

    @Transactional
    public LoginResponse kakaoLoginConfirm(KakaoLoginConfirmRequest request) {
        KakaoHost kakaoHost = toKakaoHost(request);
        String accessToken = jwtTokenProvider.generateAccessToken(kakaoHost.getHost().getId());
        String refreshToken= jwtTokenProvider.generateRefreshToken(kakaoHost.getHost().getId());
        return LoginResponse.of(accessToken, refreshToken);
    }

    private KakaoHost toKakaoHost(KakaoLoginConfirmRequest request) {
        KakaoIdToken idToken = jwtParser.parseIdToken(request.idToken());
        Optional<KakaoHost> kakaoHost = kakaoHostRepository.findByUserId(idToken.sub());
        Host host = new Host(idToken.nickname(), idToken.picture());

        return kakaoHost.orElseGet(() -> kakaoHostRepository.save(new KakaoHost(host, idToken.sub())));
    }

    public LoginResponse refresh(String refreshToken) {
        jwtTokenProvider.validateToken(refreshToken);
        Long hostId = jwtTokenProvider.getHostId(refreshToken);
        Host host = hostRepository.getById(hostId);
        String accessToken = jwtTokenProvider.generateAccessToken(host.getId());
        return LoginResponse.of(accessToken, refreshToken);
    }

    public HostResponse getCurrentUser(Host host) {
        return HostResponse.from(host);
    }

    @Transactional
    public void agreeTerms(Host host) {
        host.agreeTerms();
    }
}
