package com.forgather.domain.space.dto;

import com.forgather.domain.space.model.Space;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public record CreateSpaceRequest(

    @Schema(description = "스페이스 이름", example = "졸업 전시", maxLength = 15)
    @NotBlank
    String name,

    @Schema(description = "스페이스 설명", example = "스페이스 설명", maxLength = 200, nullable = true)
    String description,

    @Schema(description = "스페이스 공개 여부", example = "true")
    boolean isPublic,

    @Schema(description = "스페이스 호스트 인스타그램 아이디", example = "forgather_official", maxLength = 30, nullable = true)
    String instagramUsername,

    @Schema(description = "스페이스 호스트 이메일", example = "forgather@forgather.me", maxLength = 50, nullable = true)
    @Email
    String email
) {

    public Space toEntity(String spaceCode) {
        return new Space(spaceCode, name, description, isPublic, instagramUsername, email);
    }
}
