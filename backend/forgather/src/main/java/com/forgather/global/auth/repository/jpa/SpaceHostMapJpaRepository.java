package com.forgather.global.auth.repository.jpa;

import org.springframework.data.jpa.repository.JpaRepository;

import com.forgather.global.auth.model.SpaceHostMap;
import com.forgather.global.auth.repository.SpaceHostMapRepository;

public interface SpaceHostMapJpaRepository extends JpaRepository<SpaceHostMap, Long>, SpaceHostMapRepository {
}
