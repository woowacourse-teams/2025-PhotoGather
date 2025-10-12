package com.forgather.domain.guestbook.repository;

import java.util.List;

import com.forgather.domain.guestbook.model.GuestBookCardPhoto;

public interface GuestBookCardPhotoRepository {
    <S extends GuestBookCardPhoto> List<S> saveAll(Iterable<S> photos);
}
