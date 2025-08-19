package com.forgather.domain.guest.dto;

import io.swagger.v3.oas.annotations.media.Schema;

public record CreateGuestRequest(

    @Schema(description = "스페이스 코드", example = "1234567890")
    String spaceCode,

    @Schema(description = "게스트 이름", example = "민성제의분노의앞니")
    String name
) {
}
