package com.forgather.domain.guestbook.repository;

import java.util.List;

import com.forgather.domain.guestbook.model.GuestBookCard;
import com.forgather.domain.guestbook.model.GuestBookCardPhoto;

public interface GuestBookCardPhotoRepository {
    <S extends GuestBookCardPhoto> List<S> saveAll(Iterable<S> photos);

    List<GuestBookCardPhoto> findAllByGuestBookCard(GuestBookCard guestBookCard);

    void deleteAll(Iterable<? extends GuestBookCardPhoto> photos);

    Boolean existsByGuestBookCard(GuestBookCard guestBookCard);
}
