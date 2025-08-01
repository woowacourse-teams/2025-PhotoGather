package com.forgather.global.auth.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.forgather.global.auth.domain.RefreshToken;

public interface RefreshTokenRepository extends JpaRepository<RefreshToken, Long> {
}
