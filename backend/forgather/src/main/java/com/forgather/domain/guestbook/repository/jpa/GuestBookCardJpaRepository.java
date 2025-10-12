package com.forgather.domain.guestbook.repository.jpa;

import org.springframework.data.jpa.repository.JpaRepository;

import com.forgather.domain.guestbook.model.GuestBookCard;
import com.forgather.domain.guestbook.repository.GuestBookCardRepository;

public interface GuestBookCardJpaRepository extends JpaRepository<GuestBookCard, Long>, GuestBookCardRepository {
}
