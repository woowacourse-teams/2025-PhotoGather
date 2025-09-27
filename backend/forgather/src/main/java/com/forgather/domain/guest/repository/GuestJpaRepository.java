package com.forgather.domain.guest.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.forgather.domain.guest.model.Guest;

public interface GuestJpaRepository extends JpaRepository<Guest, Long>, GuestRepository {
}
