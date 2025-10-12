package com.forgather.domain.guestbook.repository;

import com.forgather.domain.guestbook.model.GuestBookCard;

public interface GuestBookCardRepository {
    GuestBookCard save(GuestBookCard guestBookCard);
}
