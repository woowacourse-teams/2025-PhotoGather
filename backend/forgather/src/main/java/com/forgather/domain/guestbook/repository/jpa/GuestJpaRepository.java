package com.forgather.domain.guestbook.repository.jpa;

import org.springframework.data.jpa.repository.JpaRepository;

import com.forgather.domain.guestbook.model.Guest;
import com.forgather.domain.guestbook.repository.GuestRepository;

public interface GuestJpaRepository extends JpaRepository<Guest, Long>, GuestRepository {
}
