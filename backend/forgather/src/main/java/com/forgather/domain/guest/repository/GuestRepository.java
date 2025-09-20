package com.forgather.domain.guest.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.forgather.domain.guest.model.Guest;
import com.forgather.global.exception.BaseException;
import com.forgather.global.exception.NotFoundException;

public interface GuestRepository extends JpaRepository<Guest, Long> {

    Optional<Guest> findById(Long id);

    default Guest getById(Long id) {
        if (id ==  null) {
            throw new BaseException("id는 null일 수 없습니다.");
        }
        return findById(id).orElseThrow(() -> new NotFoundException("Guest를 찾을 수 없습니다. guestId: " + id));
    }
}
