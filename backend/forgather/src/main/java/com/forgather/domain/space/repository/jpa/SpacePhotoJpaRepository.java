package com.forgather.domain.space.repository.jpa;

import org.springframework.data.jpa.repository.JpaRepository;

import com.forgather.domain.space.model.SpacePhoto;
import com.forgather.domain.space.repository.SpacePhotoRepository;

public interface SpacePhotoJpaRepository extends JpaRepository<SpacePhoto, Long>, SpacePhotoRepository {
}
