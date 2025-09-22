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

    private final JwtProperties jwtProperties;

    public String generateAccessToken(Long hostId) {
        Date now = new Date();
        Date expiry = new Date(now.getTime() + (jwtProperties.getAccessTokenExpiration() * 1000));

        return Jwts.builder()
            .subject(String.valueOf(hostId))
            .claim("hostId", hostId)
            .issuedAt(now)
            .expiration(expiry)
            .signWith(getSigningKey())
            .compact();
    }

    public String generateRefreshToken(Long hostId) {
        Date now = new Date();
        Date expiry = new Date(now.getTime() + (jwtProperties.getRefreshTokenExpiration() * 1000L));

        return Jwts.builder()
            .subject(String.valueOf(hostId))
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

    public Long getHostId(String token) {
        Claims claims = getClaims(token);
        return Long.parseLong(claims.getSubject());
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
