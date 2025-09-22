package com.forgather.domain.space.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.forgather.domain.space.model.Photo;
import com.forgather.domain.space.model.Space;
import com.forgather.global.exception.BaseException;
import com.forgather.global.exception.NotFoundException;

public interface PhotoRepository extends JpaRepository<Photo, Long> {

    default Photo getById(Long id) {
        if (id ==  null) {
            throw new BaseException("id는 null일 수 없습니다.");
        }
        return findById(id)
            .orElseThrow(() -> new NotFoundException("존재하지 않는 사진입니다. 사진 ID: " + id));
    }

    Page<Photo> findAllBySpace(Space space, Pageable pageable);

    List<Photo> findAllBySpace(Space space);

    List<Photo> findAllByIdIn(List<Long> photoIds);
}
