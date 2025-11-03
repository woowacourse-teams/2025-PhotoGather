package com.forgather.back_office.dto;

import java.util.List;

import org.springframework.data.domain.Page;

import com.forgather.domain.space.model.Space;

public record AdminSpaceResponse(
    List<SimpleSpaceResponse> spaces,
    int currentPage,
    int pageSize,
    long totalCount,
    int totalPages
) {
    public static AdminSpaceResponse from(Page<Space> spaces) {
        return new AdminSpaceResponse(
            spaces.map(SimpleSpaceResponse::from).toList(),
            spaces.getNumber() + 1,
            spaces.getSize(),
            spaces.getTotalElements(),
            spaces.getTotalPages()
        );
    }
}
