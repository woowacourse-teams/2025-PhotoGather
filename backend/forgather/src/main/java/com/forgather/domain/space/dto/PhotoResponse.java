package com.forgather.domain.space.dto;

import com.forgather.domain.space.model.Photo;

import java.time.LocalDateTime;

public record PhotoResponse(
    Long id,
    String path,
    String originalName,
    LocalDateTime capturedAt,
    LocalDateTime createdAt
) {

    public static PhotoResponse from(Photo photo) {
        return new PhotoResponse(
            photo.getId(),
            photo.getPath(),
            photo.getOriginalName(),
            photo.getCapturedAt(),
            photo.getCreatedAt()
        );
    }
}
