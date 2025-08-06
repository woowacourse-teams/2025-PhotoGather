package com.forgather.global.auth.util;

import java.util.Base64;

import org.springframework.stereotype.Component;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.forgather.global.auth.client.KakaoTokenDto;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class JwtParser {

    private final ObjectMapper objectMapper;

    /**
     * TODO
     * jwt 검증 필요.
     *
     * // 카카오 공개 키 가져오기 (JWK)
     * GET https://kauth.kakao.com/.well-known/jwks.json
     * → JWT의 kid 헤더를 기반으로 해당 키를 찾아 사용
     */
    public KakaoTokenDto.IdToken parseIdToken(String idToken) {
        try {
            String payload = idToken.split("\\.")[1];
            String decodedPayload = new String(Base64.getDecoder().decode(payload));
            return objectMapper.readValue(decodedPayload, KakaoTokenDto.IdToken.class);
        } catch (Exception e) {
            throw new RuntimeException("Failed to parse JWT", e);
        }
    }
}
