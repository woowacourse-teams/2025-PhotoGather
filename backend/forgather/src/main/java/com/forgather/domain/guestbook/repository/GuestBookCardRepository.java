package com.forgather.domain.guestbook.repository;

import java.util.Optional;

import org.springframework.http.HttpStatus;

import com.forgather.domain.guestbook.model.GuestBookCard;
import com.forgather.domain.space.model.Space;
import com.forgather.global.exception.BaseNullPointerException;
import com.forgather.global.exception.NotFoundException;

public interface GuestBookCardRepository {

    GuestBookCard save(GuestBookCard guestBookCard);

    Optional<GuestBookCard> findById(Long id);

    Long countBySpace(Space space);

    default GuestBookCard getByIdOrThrow(Long id) {
        if (id == null) {
            throw new BaseNullPointerException("방명록 카드의 id는 null일 수 없습니다.", HttpStatus.BAD_REQUEST);
        }
        return findById(id)
            .orElseThrow(() -> new NotFoundException("존재하지 않는 방명록 카드입니다. id: " + id));
    }
}
