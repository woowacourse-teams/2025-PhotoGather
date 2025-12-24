package com.forgather.domain.space.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.forgather.domain.space.model.Space;
import com.forgather.global.exception.BaseException;
import com.forgather.global.exception.NotFoundException;

public interface SpaceRepository {

    Space save(Space space);

    Optional<Space> findByCodeAndDeletedAtIsNull(String spaceCode);

    List<Space> findAllByDeletedAtIsNull();

    Page<Space> findAllByDeletedAtIsNull(Pageable pageable);

    @Query("""
        SELECT DISTINCT s
        FROM Space s
                LEFT JOIN Product p ON p.space = s AND p.deletedAt IS NULL
        WHERE s.deletedAt IS NULL AND (
                (:hasProduct = true AND p.id IS NOT NULL) OR
                        (:hasProduct = false AND p.id IS NULL)
        )
        """)
    Page<Space> findAllByDeletedAtIsNullAndProductFilter(
        @Param("hasProduct") boolean hasProduct,
        Pageable pageable
    );

    long count();

    default Space getByCodeAndDeletedAtIsNullOrThrow(String spaceCode) {
        if (spaceCode == null) {
            throw new BaseException("스페이스 코드는 null일 수 없습니다. code: " + spaceCode);
        }
        return findByCodeAndDeletedAtIsNull(spaceCode)
            .orElseThrow(() -> new NotFoundException("존재하지 않는 스페이스입니다. spaceCode: " + spaceCode));
    }
}
