package com.forgather.domain.space.repository;

import java.util.Optional;

import com.forgather.domain.space.model.Space;
import com.forgather.domain.space.model.SpacePhoto;

public interface SpacePhotoRepository {

    SpacePhoto save(SpacePhoto spacePhoto);

    Optional<SpacePhoto> findBySpace(Space space);

    void delete(SpacePhoto spacePhoto);

    default SpacePhoto getBySpaceOrEmpty(Space space) {
        return findBySpace(space)
            .orElse(SpacePhoto.empty());
    }
}
