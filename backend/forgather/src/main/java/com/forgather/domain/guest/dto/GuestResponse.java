package com.forgather.domain.guest.dto;

import com.forgather.domain.guest.model.Guest;

import io.swagger.v3.oas.annotations.media.Schema;

public record GuestResponse(

    @Schema(description = "게스트 ID", example = "1")
    Long id,

    @Schema(description = "스페이스 코드", example = "1234567890")
    String spaceCode,

    @Schema(description = "게스트 이름", example = "John Doe")
    String name
) {

    public static GuestResponse from(Guest guest) {
        return new GuestResponse(guest.getId(), guest.getSpace().getCode(), guest.getName());
    }
}
