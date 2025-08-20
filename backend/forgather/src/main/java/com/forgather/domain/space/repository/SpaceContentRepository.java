package com.forgather.domain.space.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.forgather.domain.space.model.SpaceContent;

public interface SpaceContentRepository extends JpaRepository<SpaceContent, Long> {
}
