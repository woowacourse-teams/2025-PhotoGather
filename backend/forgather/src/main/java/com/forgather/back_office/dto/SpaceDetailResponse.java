package com.forgather.back_office.dto;

import com.forgather.domain.space.model.Space;

public record SpaceDetailResponse(
    SimpleSpaceResponse space,
    Boolean hasProduct,
    Long guestBookCount
) {

    public static SpaceDetailResponse of(Space space, Boolean hasProduct, Long guestBookCount) {
        return new SpaceDetailResponse(SimpleSpaceResponse.from(space), hasProduct, guestBookCount);
    }
}
