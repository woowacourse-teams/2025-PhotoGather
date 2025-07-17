package com.forgather.domain.space.dto;

import java.time.LocalDateTime;

import com.forgather.domain.space.model.Space;

public record CreateSpaceRequest(
    String name,
    LocalDateTime openedAt,
    String password
) {

    public Space toEntity(String spaceCode) {
        return new Space(spaceCode, password, name, openedAt);
    }
}
