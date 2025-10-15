package com.forgather.fixture;

import org.springframework.test.util.ReflectionTestUtils;

import com.forgather.domain.guestbook.model.GuestBookCard;
import com.forgather.domain.guestbook.model.GuestBookCardPhoto;

public class GuestBookCardPhotoFixture {

    private static GuestBookCard guestBookCard = GuestBookCardFixture.createGuestBookCard();

    public static GuestBookCardPhoto createGuestBookCardPhoto() {
        return new GuestBookCardPhoto("originalName", "path", 1024L, guestBookCard);
    }

    public static GuestBookCardPhoto createGuestBookCardPhotoSetId(Long id) {
        GuestBookCardPhoto guestBookCardPhoto = new GuestBookCardPhoto("originalName", "path", 1024L, guestBookCard);
        ReflectionTestUtils.setField(guestBookCardPhoto, "id", id);
        return guestBookCardPhoto;
    }
}
