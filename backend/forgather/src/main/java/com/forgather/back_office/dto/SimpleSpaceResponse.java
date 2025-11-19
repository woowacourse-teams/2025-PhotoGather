package com.forgather.back_office.dto;

import com.forgather.domain.space.model.Space;

public record SimpleSpaceResponse(
    Long id,
    String code,
    String name,
    Boolean isPublic
) {

    public static SimpleSpaceResponse from(Space space) {
        return new SimpleSpaceResponse(space.getId(), space.getCode(), space.getName(), space.isPublic());
    }
}
