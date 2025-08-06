package com.forgather.domain.space.dto;

import java.util.List;

public record DeletePhotosRequest(
    List<Long> photoIds
) {
}
