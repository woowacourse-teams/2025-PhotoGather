package com.forgather.global.auth.dto;

import com.forgather.global.auth.model.Host;

import io.swagger.v3.oas.annotations.media.Schema;

public record HostResponse(

    @Schema(description = "호스트 ID", example = "1")
    Long id,

    @Schema(description = "호스트 이름", example = "홍길동")
    String name,

    @Schema(description = "호스트 프로필 사진 URL", example = "https://example.com/profile.jpg")
    String pictureUrl,

    @Schema(description = "약관 동의 여부", example = "true")
    boolean agreedTerms
) {

    public static HostResponse from(Host host) {
        return new HostResponse(host.getId(), host.getName(), host.getPictureUrl(), host.getAgreedTerms());
    }
}
