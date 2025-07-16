package com.forgather.domain.space.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.forgather.domain.space.model.Space;

public interface SpaceRepository extends JpaRepository<Space, Long> {

    Optional<Space> findByHostCode(String hostCode);

    default Space getByHostCode(String hostCode) {
        return findByHostCode(hostCode)
            .orElseThrow(() -> new IllegalArgumentException("Space not found for host code: " + hostCode));
    }
}
