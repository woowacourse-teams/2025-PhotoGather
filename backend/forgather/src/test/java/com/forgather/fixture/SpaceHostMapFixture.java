package com.forgather.fixture;

import com.forgather.domain.space.model.Space;
import com.forgather.global.auth.model.Host;
import com.forgather.global.auth.model.SpaceHostMap;

public class SpaceHostMapFixture {

    public static SpaceHostMap createSpaceHostMapWithSpaceAndHost(Space space, Host host) {
        return new SpaceHostMap(space, host);
    }

    public static SpaceHostMap createSpaceHostMap() {
        return createSpaceHostMapWithSpaceAndHost(SpaceFixture.createSpace(), HostFixture.createHost());
    }
}
