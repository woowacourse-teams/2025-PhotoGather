package com.forgather.domain.space.repository.jpa;

import org.springframework.data.jpa.repository.JpaRepository;

import com.forgather.domain.space.model.Photo;
import com.forgather.domain.space.repository.PhotoRepository;

public interface PhotoJpaRepository extends JpaRepository<Photo, Long>, PhotoRepository {
}
