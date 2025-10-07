package com.forgather.fixture;

import com.forgather.domain.space.model.Space;
import com.forgather.global.auth.model.Host;

public class SpaceFixture {

    public static Space createSpace() {
        Host host = HostFixture.createHost();
        return new Space(host, "1234567890", "name", "description", true, "instagramUsername", "email");
    }

    public static Space createSpace(Host host) {
        return new Space(host, "1234567890", "name", "description", true, "instagramUsername", "email");
    }
}
