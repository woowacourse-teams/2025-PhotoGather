package com.forgather.domain.space.repository;

import com.forgather.domain.space.model.Photo;

import org.springframework.data.jpa.repository.JpaRepository;

public interface PhotoRepository extends JpaRepository<Photo, Long> {

    default Photo getById(Long photoId) {
        return findById(photoId)
            .orElseThrow(() -> new IllegalArgumentException());
    }
}
