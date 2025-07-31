package com.forgather.global.auth.util;

import java.util.Base64;

import org.springframework.stereotype.Component;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.forgather.global.auth.client.KakaoLoginTokenDto;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class JwtParser {

    private final ObjectMapper objectMapper;

    public KakaoLoginTokenDto.UserInfo parseIdToken(String idToken) {
        try {
            String payload = idToken.split("\\.")[1];
            String decodedPayload = new String(Base64.getDecoder().decode(payload));
            return objectMapper.readValue(decodedPayload, KakaoLoginTokenDto.UserInfo.class);
        } catch (Exception e) {
            throw new RuntimeException("Failed to parse JWT", e);
        }
    }
}
