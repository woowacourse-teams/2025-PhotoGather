package com.forgather.global.auth.dto;

import com.forgather.global.auth.domain.Host;

import io.swagger.v3.oas.annotations.media.Schema;

public record HostResponse(

    @Schema(description = "호스트 ID", example = "1")
    Long id,

    @Schema(description = "호스트 이름", example = "모코")
    String name,

    @Schema(description = "호스트 프로필 이미지", example = "https://example.com/profile.jpg")
    String pictureUrl
) {

    public static HostResponse from(Host host) {
        return new HostResponse(host.getId(), host.getName(), host.getPictureUrl());
    }
}
