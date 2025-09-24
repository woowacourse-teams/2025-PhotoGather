package com.forgather.domain.space.repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import com.forgather.domain.space.model.Space;
import com.forgather.global.exception.NotFoundException;

public interface SpaceRepository {

    void delete(Space space);

    Space save(Space space);

    Optional<Space> findByCode(String spaceCode);

    List<Space> findAll();

    default Space getByCode(String spaceCode) {
        return findByCode(spaceCode)
            .orElseThrow(() -> new NotFoundException("존재하지 않는 스페이스입니다. 스페이스 코드: " + spaceCode));
    }

    default Space getUnexpiredSpaceByCode(String spaceCode) {
        Space space = getByCode(spaceCode);
        space.validateExpiration(LocalDateTime.now());
        return space;
    }
}
