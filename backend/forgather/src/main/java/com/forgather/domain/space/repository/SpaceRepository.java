package com.forgather.domain.space.repository;

import java.time.LocalDateTime;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.forgather.domain.space.model.Space;

public interface SpaceRepository extends JpaRepository<Space, Long> {

    Optional<Space> findByCode(String spaceCode);

    default Space getByCode(String spaceCode) {
        return findByCode(spaceCode)
            .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 스페이스입니다. 스페이스 코드: " + spaceCode));
    }

    default Space getUnexpiredSpaceByCode(String spaceCode) {
        Space space = getByCode(spaceCode);
        space.validateExpiration(LocalDateTime.now());
        return space;
    }

    void deleteByCode(String spaceCode);
}
