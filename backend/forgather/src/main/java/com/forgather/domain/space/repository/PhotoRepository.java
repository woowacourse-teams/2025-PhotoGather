package com.forgather.domain.space.repository;


import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.forgather.domain.space.model.Photo;
import com.forgather.domain.space.model.Space;

public interface PhotoRepository extends JpaRepository<Photo, Long> {

    default Photo getById(Long photoId) {
        return findById(photoId)
            .orElseThrow(() -> new IllegalArgumentException());
    }

    Page<Photo> findAllBySpace(Space space, Pageable pageable);
}
