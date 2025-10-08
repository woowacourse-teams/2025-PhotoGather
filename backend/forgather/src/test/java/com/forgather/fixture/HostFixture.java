package com.forgather.fixture;

import com.forgather.global.auth.model.Host;

public class HostFixture {
    public static Host createHost() {
        return new Host("포스티", "pictureUrl");
    }
}
