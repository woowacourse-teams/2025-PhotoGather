package com.forgather.domain.guestbook.dto;

import com.forgather.domain.guestbook.model.GuestBookCard;
import com.forgather.domain.guestbook.model.GuestBookCardPhoto;

public record WriteGuestBookCardPhotoRequest(
    String originalName,
    String uploadFileName,
    Long capacity
) {
    public GuestBookCardPhoto toEntity(String path, GuestBookCard guestBookCard) {
        return new GuestBookCardPhoto(originalName, path, capacity, guestBookCard);
    }
}
