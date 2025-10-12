package com.forgather.fixture;

import com.forgather.domain.guestbook.model.Guest;

public class GuestFixture {

    public static Guest createGuest() {
        return new Guest("nickname");
    }

    public static Guest createGuestWithNickname(String nickname) {
        return new Guest(nickname);
    }
}
