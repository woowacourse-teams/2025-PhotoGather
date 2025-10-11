package com.forgather.domain.guestbook.repository;

import java.util.Optional;

import org.springframework.stereotype.Repository;

import com.forgather.domain.guestbook.model.Guest;
import com.forgather.global.exception.BaseException;
import com.forgather.global.exception.NotFoundException;

@Repository
public interface GuestRepository {

    Guest save(Guest guest);

    Optional<Guest> findById(Long id);

    default Guest getByIdOrThrow(Long id) {
        if (id ==  null) {
            throw new BaseException("게스트의 id는 null일 수 없습니다. id: " + id);
        }
        return findById(id)
            .orElseThrow(() -> new NotFoundException("존재하지 않는 게스트입니다. id: " + id));
    }
}
