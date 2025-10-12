package com.forgather.fixture;

import com.forgather.domain.guestbook.model.Guest;

public class GuestFixture {

    public static Guest createGuest() {
        return new Guest("nickname");
    }
}
