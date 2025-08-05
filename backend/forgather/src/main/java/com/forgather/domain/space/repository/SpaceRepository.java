package com.forgather.domain.space.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.forgather.domain.space.model.Space;

public interface SpaceRepository extends JpaRepository<Space, Long> {

    Optional<Space> findBySpaceCode(String spaceCode);

    default Space getBySpaceCode(String spaceCode) {
        return findBySpaceCode(spaceCode)
            .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 스페이스입니다. 스페이스 코드: " + spaceCode));
    }
}
