package com.forgather.domain.space.dto;

import com.forgather.domain.space.model.Space;

import io.swagger.v3.oas.annotations.media.Schema;

public record CreateSpaceRequest(

    @Schema(description = "스페이스 이름", example = "우리의 모임", maxLength = 15)
    String name,

    @Schema(description = "스페이스 설명", example = "우리의 모임", maxLength = 200)
    String description,

    @Schema(description = "스페이스 공개 여부", example = "true")
    boolean isPublic,

    @Schema(description = "스페이스 호스트 인스타그램 아이디", example = "forgather_official", maxLength = 30)
    String instagramUsername,

    @Schema(description = "스페이스 호스트 이메일", example = "forgather@forgather.me", maxLength = 50)
    String email
) {

    public Space toEntity(String spaceCode, String pictureUrl) {
        return new Space(spaceCode, name, description, pictureUrl, isPublic, instagramUsername, email);
    }
}
