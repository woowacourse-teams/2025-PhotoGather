package com.forgather.domain.space.repository;

import java.time.LocalDateTime;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.forgather.domain.space.model.Space;
import com.forgather.global.exception.BaseException;
import com.forgather.global.exception.NotFoundException;

public interface SpaceRepository extends JpaRepository<Space, Long> {

    Optional<Space> findByCode(String spaceCode);

    void deleteByCode(String spaceCode);

    default Space getByCode(String spaceCode) {
        if (spaceCode ==  null) {
            throw new BaseException("스페이스 코드는 null일 수 없습니다.");
        }
        return findByCode(spaceCode)
            .orElseThrow(() -> new NotFoundException("존재하지 않는 스페이스입니다. 스페이스 코드: " + spaceCode));
    }

    default Space getUnexpiredSpaceByCode(String spaceCode) {
        Space space = getByCode(spaceCode);
        space.validateExpiration(LocalDateTime.now());
        return space;
    }
}
