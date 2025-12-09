package com.forgather.domain.space.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.forgather.domain.space.model.Space;
import com.forgather.domain.space.model.SpacePhoto;

public interface SpacePhotoRepository {

    SpacePhoto save(SpacePhoto spacePhoto);

    Optional<SpacePhoto> findBySpace(Space space);

    @Query("""
        SELECT sp
        FROM SpacePhoto sp
        WHERE sp.space.id IN :spaceIds
        """)
    List<SpacePhoto> findAllBySpaceIdIn(@Param("spaceIds") List<Long> spaceIds);

    void delete(SpacePhoto spacePhoto);

    default SpacePhoto getBySpaceOrEmpty(Space space) {
        return findBySpace(space)
            .orElse(SpacePhoto.empty(space));
    }
}
