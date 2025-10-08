package com.forgather.global.auth.repository;

import java.util.List;

import com.forgather.domain.space.model.Space;
import com.forgather.global.auth.model.Host;
import com.forgather.global.auth.model.SpaceHostMap;

public interface SpaceHostMapRepository {

    SpaceHostMap save(SpaceHostMap spaceHostMap);

    List<SpaceHostMap> findAllByHost(Host host);

    void deleteBySpace(Space space);
}
