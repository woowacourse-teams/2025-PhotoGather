package com.forgather.global.auth.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.forgather.global.auth.domain.Host;

public interface HostRepository extends JpaRepository<Host, Long> {

    Optional<Host> findByAccessToken(String accessToken);

    default Host getHostByAccessToken(String accessToken) {
        return findByAccessToken(accessToken)
            .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 호스트입니다. Access Token: " + accessToken));
    }
}
