package com.forgather.domain.space.dto;

import com.forgather.domain.space.model.Space;

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

    @Schema(description = "스페이스 공개여부", example = "true")
    boolean isPublic,

    @Schema(description = "스페이스 호스트 인스타그램 아이디", example = "forgather_official")
    String instagramUsername,

    @Schema(description = "스페이스 호스트 이메일", example = "forgather@forgather.me")
    String email,

    @Schema(description = "스페이스 프로필 사진", example = """
        {
            "isExists": true,
            "path": "photogather/v2/spaces/1234567890/space/profile.png"
        }
        """)
    SpacePhotoResponse spacePhoto,

    @Schema(description = "스페이스 방명록 카드 개수", example = "15")
    Long guestBookCardCount
) {

    public static SpaceResponse from(Space space, SpacePhotoResponse spacePhoto, Long guestBookCardCount) {
        return new SpaceResponse(
            space.getId(),
            space.getCode(),
            space.getName(),
            space.getDescription(),
            space.isPublic(),
            space.getInstagramUsername(),
            space.getEmail(),
            spacePhoto,
            guestBookCardCount
        );
    }
}
