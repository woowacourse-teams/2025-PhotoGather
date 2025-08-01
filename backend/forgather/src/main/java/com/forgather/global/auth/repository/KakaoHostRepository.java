package com.forgather.global.auth.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.forgather.global.auth.domain.KakaoHost;

public interface KakaoHostRepository extends JpaRepository<KakaoHost, Long> {

    Optional<KakaoHost> findByUserId(String userId);

    default KakaoHost getByUserId(String userId) {
        return findByUserId(userId)
            .orElseThrow(() -> new IllegalArgumentException("KakaoHost를 찾을 수 없습니다. userId: " + userId));
    }
}
