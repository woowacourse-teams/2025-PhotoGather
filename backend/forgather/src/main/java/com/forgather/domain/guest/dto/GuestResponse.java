package com.forgather.domain.guest.dto;

import com.forgather.domain.guest.model.Guest;

import io.swagger.v3.oas.annotations.media.Schema;

public record GuestResponse(
    @Schema(description = "게스트 닉네임", example = "John Doe")
    String nickname
) {

    public static GuestResponse from(Guest guest) {
        return new GuestResponse(guest.getNickname());
    }
}
