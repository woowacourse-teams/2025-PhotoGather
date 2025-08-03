package com.forgather.domain.space.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.forgather.domain.space.model.Photo;
import com.forgather.domain.space.model.Space;

public interface PhotoRepository extends JpaRepository<Photo, Long> {

    default Photo getById(Long photoId) {
        return findById(photoId)
            .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 사진입니다. 사진 ID: " + photoId));
    }

    Page<Photo> findAllBySpace(Space space, Pageable pageable);

    List<Photo> findAllBySpace(Space space);

    void deleteBySpace(Space space);
}
