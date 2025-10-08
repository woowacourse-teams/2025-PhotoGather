package com.forgather.domain.space.repository;

import java.util.Optional;

import com.forgather.domain.space.model.Space;
import com.forgather.domain.space.model.SpacePhoto;
import com.forgather.global.exception.NotFoundException;

public interface SpacePhotoRepository {

    SpacePhoto save(SpacePhoto spacePhoto);

    Optional<SpacePhoto> findBySpace(Space space);

    void delete(SpacePhoto spacePhoto);

    default SpacePhoto getBySpaceOrThrow(Space space) {
        return findBySpace(space)
            .orElseThrow(() -> new NotFoundException("아직 스페이스 사진을 등록하지 않았습니다."));
    }
}
