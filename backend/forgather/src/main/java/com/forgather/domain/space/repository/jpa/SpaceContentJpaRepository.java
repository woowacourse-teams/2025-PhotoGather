package com.forgather.domain.space.repository.jpa;

import org.springframework.data.jpa.repository.JpaRepository;

import com.forgather.domain.space.model.SpaceContent;
import com.forgather.domain.space.repository.SpaceContentRepository;

public interface SpaceContentJpaRepository extends JpaRepository<SpaceContent, Long>, SpaceContentRepository {
}
