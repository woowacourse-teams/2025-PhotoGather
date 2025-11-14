package com.forgather.back_office.dto;

import java.time.LocalDateTime;
import java.util.List;

import com.forgather.global.auth.model.Host;

public record HostDetailResponse(
    Long id,
    String name,
    LocalDateTime createdAt,
    List<Long> spaceIds
) {

    public static HostDetailResponse of(Host host, List<Long> spaceIds) {
        return new HostDetailResponse(host.getId(), host.getName(), host.getCreatedAt(), spaceIds);
    }
}
