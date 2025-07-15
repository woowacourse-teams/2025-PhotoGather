package com.forgather.domain.space.dto;

import com.forgather.domain.space.model.Space;

public record CreateSpaceResponse(
    String guestCode,
    String hostCode
) {

    public static CreateSpaceResponse from(Space space) {
        return new CreateSpaceResponse(space.getGuestCode(), space.getHostCode());
    }
}
