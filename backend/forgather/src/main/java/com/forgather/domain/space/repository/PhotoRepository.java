package com.forgather.domain.space.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.forgather.domain.space.model.Photo;
import com.forgather.domain.space.model.Space;
import com.forgather.global.exception.NotFoundException;

public interface PhotoRepository {

    Photo save(Photo photo);

    <S extends Photo> List<S> saveAll(Iterable<S> photos);

    Page<Photo> findAllBySpace(Space space, Pageable pageable);

    List<Photo> findAllBySpace(Space space);

    List<Photo> findAllByIdIn(List<Long> photoIds);

    Optional<Photo> findById(Long photoId);

    default Photo getByIdOrThrow(Long photoId) {
        return findById(photoId)
            .orElseThrow(() -> new NotFoundException("존재하지 않는 사진입니다. 사진 ID: " + photoId));
    }
}
