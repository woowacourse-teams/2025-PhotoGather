package com.forgather.domain.space.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.forgather.domain.space.model.Space;
import com.forgather.global.exception.BaseException;
import com.forgather.global.exception.NotFoundException;

public interface SpaceRepository {

    void delete(Space space);

    Space save(Space space);

    Optional<Space> findByCode(String spaceCode);

    List<Space> findAll();

    Page<Space> findAll(Pageable pageable);

    long count();

    default Space getByCodeOrThrow(String spaceCode) {
        if (spaceCode == null) {
            throw new BaseException("스페이스 코드는 null일 수 없습니다. code: " + spaceCode);
        }
        return findByCode(spaceCode)
            .orElseThrow(() -> new NotFoundException("존재하지 않는 스페이스입니다. spaceCode: " + spaceCode));
    }
}
