package com.forgather.domain.space.dto;

import com.forgather.domain.space.model.Space;
import com.forgather.global.auth.dto.HostResponse;

import io.swagger.v3.oas.annotations.media.Schema;

public record SpaceResponse(

    @Schema(description = "스페이스 ID", example = "1")
    Long id,

    @Schema(description = "스페이스 코드", example = "1234567890")
    String spaceCode,

    @Schema(description = "스페이스 이름", example = "My Space")
    String name,

    @Schema(description = "스페이스 설명", example = "나의 졸업 전시.")
    String description,

    @Schema(description = "스페이스 설명", example = "나의 졸업 전시.")
    String pictureUrl,

    @Schema(description = "스페이스 설명", example = "나의 졸업 전시.")
    boolean isPublic,

    @Schema(description = "스페이스 설명", example = "나의 졸업 전시.")
    String instagramUsername,

    @Schema(description = "스페이스 설명", example = "나의 졸업 전시.")
    String email,

    @Schema(description = "호스트 정보")
    HostResponse host
) {

    public static SpaceResponse from(Space space) {
        return new SpaceResponse(
            space.getId(),
            space.getCode(),
            space.getName(),
            space.getDescription(),
            space.getPictureUrl(),
            space.isPublic(),
            space.getInstagramUsername(),
            space.getEmail(),
            // TODO: 스페이스 : 호스트 m:n 관계로 변경 후 수정 필요
            HostResponse.from(space.getSpaceHostMap().getFirst().getHost())
        );
    }
}
