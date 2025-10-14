package com.forgather.domain.space.repository.jpa;

import org.springframework.data.jpa.repository.JpaRepository;

import com.forgather.domain.space.model.Space;
import com.forgather.domain.space.repository.SpaceRepository;

public interface SpaceJpaRepository extends JpaRepository<Space, Long>, SpaceRepository {
}
