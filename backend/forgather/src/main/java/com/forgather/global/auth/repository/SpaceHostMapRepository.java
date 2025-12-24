package com.forgather.global.auth.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.http.HttpStatus;

import com.forgather.domain.space.model.Space;
import com.forgather.global.auth.model.Host;
import com.forgather.global.auth.model.SpaceHostMap;
import com.forgather.global.exception.BaseNullPointerException;
import com.forgather.global.exception.NotFoundException;

public interface SpaceHostMapRepository {

    SpaceHostMap save(SpaceHostMap spaceHostMap);

    @Query("""
        SELECT shm
        FROM SpaceHostMap shm
        JOIN FETCH shm.space s
        WHERE shm.host = :host
        AND s.deletedAt IS NULL
        ORDER BY s.createdAt DESC
        """)
    List<SpaceHostMap> findAllByHostAndDeletedAtIsNullWithSpaceOrderByCreatedAtDesc(@Param("host") Host host);

    Optional<SpaceHostMap> findBySpaceAndHostAndDeletedAtIsNull(Space space, Host host);

    default SpaceHostMap getBySpaceAndHostAndDeletedAtIsNullOrThrow(Space space, Host host) {
        if (space == null) {
            throw new BaseNullPointerException("스페이스는 null일 수 없습니다.", HttpStatus.INTERNAL_SERVER_ERROR);
        }
        if (host == null) {
            throw new BaseNullPointerException("호스트는 null일 수 없습니다.", HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return findBySpaceAndHostAndDeletedAtIsNull(space, host)
            .orElseThrow(() -> new NotFoundException("존재하지 않는 자원입니다. spaceCode: %s, hostId: %d"
                .formatted(space.getCode(), host.getId())));
    }
}
