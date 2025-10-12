package com.forgather.fixture;

import com.forgather.domain.space.model.Space;

public class SpaceFixture {

    public static Space createSpace() {
        return new Space("1234567890", "name", "description", true, "instagramUsername", "email@forgather.me");
    }
}
