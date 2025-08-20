package com.forgather.global.auth.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.forgather.global.auth.model.KakaoHost;

public interface KakaoHostRepository extends JpaRepository<KakaoHost, Long> {

    Optional<KakaoHost> findByUserId(String userId);

    default KakaoHost getById(Long id) {
        return findById(id)
            .orElseThrow(() -> new IllegalArgumentException("KakaoHost를 찾을 수 없습니다. id: " + id));
    }
}
