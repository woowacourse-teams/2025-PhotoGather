package com.forgather.domain.space.dto;

import org.hibernate.validator.constraints.Length;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public record UpdateSpaceRequest(

    @Schema(description = "새로운 스페이스 이름", example = "나의 졸업전시", maxLength = 15, nullable = true)
    @Length(max = 15)
    @NotBlank
    String name,

    @Schema(description = "새로운 스페이스 설명", example = "졸업전시 스페이스입니다.", maxLength = 200, nullable = true)
    @Length(max = 200)
    String description,

    @Schema(description = "새로운 스페이스 공개여부", example = "true", nullable = true)
    Boolean isPublic,

    @Schema(description = "새로운 인스타그램 아이디", example = "forgather_official_new", maxLength = 30, nullable = true)
    @Length(max = 30)
    String instagramUsername,

    @Schema(description = "새로운 이메일", example = "forgather_new@forgather.me", maxLength = 50, nullable = true)
    @Length(max = 50)
    @Email
    String email
) {
}
