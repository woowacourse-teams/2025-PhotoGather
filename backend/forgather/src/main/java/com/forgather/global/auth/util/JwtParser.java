package com.forgather.global.auth.util;

import java.math.BigInteger;
import java.security.KeyFactory;
import java.security.PublicKey;
import java.security.spec.RSAPublicKeySpec;
import java.util.Base64;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Component;
import org.springframework.web.client.RestClient;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.forgather.global.auth.client.KakaoTokenDto;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class JwtParser {

    private final RestClient restClient;
    private final ObjectMapper objectMapper;
    private static final String KAKAO_JWKS_URL = "https://kauth.kakao.com/.well-known/jwks.json";

    public KakaoTokenDto.IdToken parseIdToken(String idToken) {
        try {
            String[] parts = idToken.split("\\.");
            if (parts.length != 3) {
                throw new IllegalArgumentException("Invalid JWT format");
            }

            String header = new String(Base64.getUrlDecoder().decode(parts[0]));
            @SuppressWarnings("unchecked")
            Map<String, Object> headerMap = objectMapper.readValue(header, Map.class);
            String kid = (String) headerMap.get("kid");

            if (kid == null) {
                throw new IllegalArgumentException("Missing kid in JWT header");
            }

            PublicKey publicKey = getKakaoPublicKey(kid);
            
            Claims claims = Jwts.parser()
                    .verifyWith(publicKey)
                    .build()
                    .parseSignedClaims(idToken)
                    .getPayload();

            return objectMapper.convertValue(claims, KakaoTokenDto.IdToken.class);
        } catch (Exception e) {
            throw new RuntimeException("Failed to parse and verify JWT", e);
        }
    }

    private PublicKey getKakaoPublicKey(String kid) {
        try {
            @SuppressWarnings("unchecked")
            Map<String, Object> jwks = restClient.get()
                    .uri(KAKAO_JWKS_URL)
                    .retrieve()
                    .body(Map.class);
            if (jwks == null) {
                throw new RuntimeException("Failed to fetch JWKS from Kakao");
            }
            
            @SuppressWarnings("unchecked")
            List<Map<String, Object>> keys = (List<Map<String, Object>>) jwks.get("keys");
            if (keys == null) {
                throw new RuntimeException("No keys found in JWKS response");
            }

            for (Map<String, Object> key : keys) {
                if (kid.equals(key.get("kid"))) {
                    String n = (String) key.get("n");
                    String e = (String) key.get("e");

                    byte[] nBytes = Base64.getUrlDecoder().decode(n);
                    byte[] eBytes = Base64.getUrlDecoder().decode(e);

                    BigInteger modulus = new BigInteger(1, nBytes);
                    BigInteger exponent = new BigInteger(1, eBytes);

                    RSAPublicKeySpec spec = new RSAPublicKeySpec(modulus, exponent);
                    KeyFactory factory = KeyFactory.getInstance("RSA");
                    return factory.generatePublic(spec);
                }
            }
            throw new IllegalArgumentException("Public key not found for kid: " + kid);
        } catch (Exception e) {
            throw new RuntimeException("Failed to get Kakao public key", e);
        }
    }
}
