package com.forgather.global.auth.util;

import java.util.Date;

import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;

import com.forgather.global.config.JwtProperties;
import com.forgather.global.exception.JwtBaseException;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class JwtTokenProvider {

    private static final String ADMIN = "ADMIN";
    private static final String HOST = "HOST";
    private final JwtProperties jwtProperties;

    public String generateAccessToken(Long id) {
        return buildAccessToken(id, HOST);
    }

    public String generateRefreshToken(Long id) {
        return buildRefreshToken(id, HOST);
    }

    public String generateAdminAccessToken(Long adminUserId) {
        return buildAccessToken(adminUserId, ADMIN);
    }

    public String generateAdminRefreshToken(Long adminUserId) {
        return buildRefreshToken(adminUserId, ADMIN);
    }

    private String buildAccessToken(Long id, String role) {
        Date now = new Date();
        Date expiry = new Date(now.getTime() + (jwtProperties.getAccessTokenExpiration() * 1000));

        return Jwts.builder()
            .subject(String.valueOf(id))
            .claim("id", id)
            .claim("role", role)
            .issuedAt(now)
            .expiration(expiry)
            .signWith(getSigningKey())
            .compact();
    }

    private String buildRefreshToken(Long id, String role) {
        Date now = new Date();
        Date expiry = new Date(now.getTime() + (jwtProperties.getRefreshTokenExpiration() * 1000L));

        return Jwts.builder()
            .subject(String.valueOf(id))
            .claim("role", role)
            .issuedAt(now)
            .expiration(expiry)
            .signWith(getSigningKey())
            .compact();
    }

    public boolean validateToken(String token) {
        try {
            Jwts.parser()
                .verifyWith(getSigningKey())
                .build()
                .parseSignedClaims(token);
            return true;
        } catch (JwtException | IllegalArgumentException e) {
            throw new JwtBaseException("Invalid JWT token", HttpStatus.UNAUTHORIZED, e);
        }
    }

    public Long getId(String token) {
        Claims claims = getClaims(token);
        return Long.parseLong(claims.getSubject());
    }

    public String getRole(String token) {
        Claims claims = getClaims(token);
        String role = claims.get("role", String.class);
        if (role != null) {
            return role;
        }
        return HOST;
    }

    private Claims getClaims(String token) {
        return Jwts.parser()
            .verifyWith(getSigningKey())
            .build()
            .parseSignedClaims(token)
            .getPayload();
    }

    private SecretKey getSigningKey() {
        byte[] keyBytes = jwtProperties.getSecret().getBytes();
        return new SecretKeySpec(keyBytes, "HmacSHA256");
    }
}
