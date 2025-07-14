package com.forgather.domain.space.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.forgather.domain.space.model.Space;

public interface SpaceRepository extends JpaRepository<Space, Long> {
}
