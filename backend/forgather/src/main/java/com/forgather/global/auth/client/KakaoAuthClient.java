package com.forgather.global.auth.client;

import java.math.BigInteger;
import java.security.KeyFactory;
import java.security.NoSuchAlgorithmException;
import java.security.PublicKey;
import java.security.spec.InvalidKeySpecException;
import java.security.spec.RSAPublicKeySpec;
import java.util.Base64;
import java.util.List;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestClient;

import com.forgather.global.config.KakaoProperties;
import com.forgather.global.exception.JwtBaseException;

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

    public PublicKey getKakaoPublicKey(String kid) {
        try {
            if (keys == null) {
                throw new JwtBaseException("카카오 공개 키가 아직 로드되지 않았습니다. 먼저 requestKeys()를 호출해야 합니다.",
                    HttpStatus.UNAUTHORIZED);
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
            throw new JwtBaseException("Public key not found for kid: " + kid,  HttpStatus.INTERNAL_SERVER_ERROR);
        } catch (NoSuchAlgorithmException | NullPointerException | InvalidKeySpecException e) {
            throw new JwtBaseException("Failed to get Kakao public key", HttpStatus.INTERNAL_SERVER_ERROR, e);
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

    public String getKakaoClientId() {
        return kakaoProperties.getClientId();
    }
}
