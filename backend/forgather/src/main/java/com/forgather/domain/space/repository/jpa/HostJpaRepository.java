package com.forgather.domain.space.repository.jpa;

import org.springframework.data.jpa.repository.JpaRepository;

import com.forgather.domain.space.repository.HostRepository;
import com.forgather.global.auth.model.Host;

public interface HostJpaRepository extends JpaRepository<Host, Long>, HostRepository {
}
