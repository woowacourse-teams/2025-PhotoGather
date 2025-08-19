package com.forgather.global.auth.client;

import java.math.BigInteger;
import java.security.KeyFactory;
import java.security.PublicKey;
import java.security.spec.RSAPublicKeySpec;
import java.util.Base64;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Component;
import org.springframework.web.client.RestClient;

import com.forgather.global.config.KakaoProperties;

/**
 * 카카오 인증 관련 클라이언트
 * https://developers.kakao.com/docs/latest/ko/kakaologin/rest-api#request-token
 */
@Component
public class KakaoAuthClient {

    private static final String KAKAO_JWKS_URL = "https://kauth.kakao.com/.well-known/jwks.json";

    private final RestClient restClient;
    private final KakaoProperties kakaoProperties;

    private List<Map<String, Object>> keys;

    public KakaoAuthClient(RestClient restClient, KakaoProperties kakaoProperties) {
        this.restClient = restClient;
        this.kakaoProperties = kakaoProperties;
        updateKakaoKeys();
    }

    public String getKakaoLoginUrl(String customUrl) {
        StringBuilder urlBuilder = new StringBuilder("https://kauth.kakao.com/oauth/authorize");
        urlBuilder.append("?client_id=").append(kakaoProperties.getClientId());
        urlBuilder.append("&redirect_uri=").append(kakaoProperties.getRedirectUri());
        if (customUrl != null) {
            urlBuilder.append("?url=" + customUrl);
        }
        urlBuilder.append("&response_type=code");
        return urlBuilder.toString();
    }

    public KakaoTokenDto.FullToken requestKakaoLoginToken(String authorizationCode, String customUrl) {
        StringBuilder urlBuilder = new StringBuilder("https://kauth.kakao.com/oauth/token");
        urlBuilder.append("?grant_type=authorization_code");
        urlBuilder.append("&client_id=").append(kakaoProperties.getClientId());
        urlBuilder.append("&redirect_uri=").append(kakaoProperties.getRedirectUri());
        if (customUrl != null) {
            urlBuilder.append("?url=" + customUrl);
        }
        urlBuilder.append("&code=").append(authorizationCode);

        return restClient.post()
            .uri(urlBuilder.toString())
            .retrieve()
            .body(KakaoTokenDto.FullToken.class);
    }

    public PublicKey getKakaoPublicKey(String kid) {
        try {
            if (keys == null) {
                throw new IllegalStateException("카카오 공개 키가 아직 로드되지 않았습니다. 먼저 requestKeys()를 호출해야 합니다.");
            }

            for (Map<String, Object> key : keys) {
                if (kid.equals(key.get("kid"))) {
                    String n = (String)key.get("n");
                    String e = (String)key.get("e");

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

    public void updateKakaoKeys() {
        @SuppressWarnings("unchecked")
        Map<String, Object> jws = restClient.get()
            .uri(KAKAO_JWKS_URL)
            .retrieve()
            .body(Map.class);
        if (jws == null) {
            throw new RuntimeException("Failed to fetch JWKS from Kakao");
        }

        @SuppressWarnings("unchecked")
        List<Map<String, Object>> keys = (List<Map<String, Object>>)jws.get("keys");
        this.keys = keys;
    }
}
