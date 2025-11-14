package com.forgather.back_office.dto;

import java.util.List;
import java.util.function.Function;

import org.springframework.data.domain.Page;

public record AdminHostResponse(
    List<HostDetailResponse> hosts,
    int currentPage,
    int pageSize,
    long totalCount,
    int totalPages
) {

    public static AdminHostResponse from(Page<HostDetailResponse> hosts) {
        return new AdminHostResponse(
            hosts.map(Function.identity()).toList(),
            hosts.getNumber() + 1,
            hosts.getSize(),
            hosts.getTotalElements(),
            hosts.getTotalPages()
        );
    }
}
