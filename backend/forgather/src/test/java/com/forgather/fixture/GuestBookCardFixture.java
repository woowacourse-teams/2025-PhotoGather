package com.forgather.fixture;

import static com.forgather.fixture.GuestFixture.createGuest;
import static com.forgather.fixture.SpaceFixture.createSpace;

import com.forgather.domain.guestbook.model.Guest;
import com.forgather.domain.guestbook.model.GuestBookCard;
import com.forgather.domain.space.model.Space;

public class GuestBookCardFixture {

    private static final Space space  = createSpace();
    private static final Guest guest = createGuest();

    public static GuestBookCard createGuestBookCard() {
        return new GuestBookCard(space, guest, "message");
    }

    public static GuestBookCard createGuestBookCard(Space space, Guest guest, String message) {
        return new GuestBookCard(space, guest, message);
    }

    public static GuestBookCard createGuestBookCardWithSpace(Space space) {
        return createGuestBookCard(space, guest, "message");
    }

    public static GuestBookCard createGuestBookCardWithGuest(Guest guest) {
        return createGuestBookCard(space, guest, "message");
    }

    public static GuestBookCard createGuestBookCardWithMessage(String message) {
        return createGuestBookCard(space, guest, message);
    }

    public static GuestBookCard createGuestBookCardWithSpaceAndGuest(Space space, Guest guest) {
        return createGuestBookCard(space, guest, "message");
    }
}
