package com.forgather.global.auth.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.forgather.global.auth.model.KakaoHost;
import com.forgather.global.exception.NotFoundException;

public interface KakaoHostRepository extends JpaRepository<KakaoHost, Long> {

    Optional<KakaoHost> findByUserId(String userId);

    default KakaoHost getById(Long id) {
        return findById(id)
            .orElseThrow(() -> new NotFoundException("KakaoHost를 찾을 수 없습니다. id: " + id));
    }
}
