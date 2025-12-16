package com.forgather.back_office.dto;

import com.forgather.domain.space.model.Space;

public record SpaceDetailResponse(
    SimpleSpaceResponse space,
    Long productCount,
    Long guestBookCount
) {

    public static SpaceDetailResponse of(Space space, Long productCount, Long guestBookCount) {
        return new SpaceDetailResponse(SimpleSpaceResponse.from(space), productCount, guestBookCount);
    }
}
