package com.forgather.global.auth.repository;

import java.time.LocalDateTime;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.forgather.global.auth.domain.RefreshToken;

public interface RefreshTokenRepository extends JpaRepository<RefreshToken, Long> {

    Optional<RefreshToken> findByToken(String token);

    default RefreshToken getByToken(String token) {
        return findByToken(token)
            .orElseThrow(() -> new IllegalArgumentException("RefreshToken을 찾을 수 없습니다. token: " + token));
    }

    @Modifying(clearAutomatically = true, flushAutomatically = true)
    @Query("DELETE FROM RefreshToken rt WHERE rt.expiredAt < :now")
    void deleteAllByExpiredBefore(@Param("now") LocalDateTime now);
}
