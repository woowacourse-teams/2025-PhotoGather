package com.forgather.domain.guestbook.repository.jpa;

import org.springframework.data.jpa.repository.JpaRepository;

import com.forgather.domain.guestbook.model.GuestBookCardPhoto;
import com.forgather.domain.guestbook.repository.GuestBookCardPhotoRepository;

public interface GuestBookCardPhotoJpaRepository
    extends JpaRepository<GuestBookCardPhoto, Long>, GuestBookCardPhotoRepository {
}
