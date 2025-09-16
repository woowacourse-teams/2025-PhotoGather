package com.forgather.global.auth.util;

import java.security.PublicKey;
import java.util.Base64;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.forgather.global.auth.client.KakaoAuthClient;
import com.forgather.global.auth.dto.KakaoIdToken;
import com.forgather.global.exception.JwtBaseException;
import com.forgather.global.exception.JwtParseException;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class JwtParser {

    private final ObjectMapper objectMapper;
    private final KakaoAuthClient kakaoAuthClient;

    public KakaoIdToken parseIdToken(String idToken) {
        try {
            String[] parts = idToken.split("\\.");
            if (parts.length != 3) {
                throw new JwtParseException("Invalid JWT format", HttpStatus.UNAUTHORIZED);
            }

            String header = new String(Base64.getUrlDecoder().decode(parts[0]));
            @SuppressWarnings("unchecked")
            Map<String, Object> headerMap = objectMapper.readValue(header, Map.class);
            String kid = (String) headerMap.get("kid");

            if (kid == null) {
                throw new JwtParseException("Missing kid in JWT header", HttpStatus.UNAUTHORIZED);
            }

            PublicKey publicKey = kakaoAuthClient.getKakaoPublicKey(kid);
            
            Claims claims = Jwts.parser()
                    .verifyWith(publicKey)
                    .build()
                    .parseSignedClaims(idToken)
                    .getPayload();

            return objectMapper.convertValue(claims, KakaoIdToken.class);
        } catch (JwtParseException e) {
            throw e;
        }catch (Exception e) {
            throw new JwtBaseException("ID Token이 잘못되었습니다.", HttpStatus.UNAUTHORIZED, e);
        }
    }
}
