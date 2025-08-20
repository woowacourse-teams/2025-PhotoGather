package com.forgather.domain.guest.dto;

import io.swagger.v3.oas.annotations.media.Schema;

public record UpdateGuestRequest(

    @Schema(description = "게스트 이름", example = "민성제의분노의앞니")
    String name
) {
}
