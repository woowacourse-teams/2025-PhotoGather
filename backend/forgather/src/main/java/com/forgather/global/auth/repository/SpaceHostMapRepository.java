package com.forgather.global.auth.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.forgather.domain.space.model.Space;
import com.forgather.global.auth.model.Host;
import com.forgather.global.auth.model.SpaceHostMap;

public interface SpaceHostMapRepository {

    SpaceHostMap save(SpaceHostMap spaceHostMap);

    @Query("""
        SELECT shm
        FROM SpaceHostMap shm
        JOIN FETCH shm.space s
        WHERE shm.host = :host
        ORDER BY s.createdAt DESC
        """)
    List<SpaceHostMap> findAllByHostWithSpaceOrderByCreatedAtDesc(@Param("host") Host host);

    void deleteBySpace(Space space);

    Optional<SpaceHostMap> findBySpaceAndHost(Space space, Host host);
}
