package com.forgather.domain.guestbook.dto;

import java.util.List;

import org.springframework.data.domain.Page;

import io.swagger.v3.oas.annotations.media.Schema;

public record GuestBookResponse(
    @Schema(description = "방명록 카드 목록", example = """
        [
            {
              "id": 1,
              "nickname": "밍퐁루블",
              "containsPhoto": false,
              "isRead": false
            },
            {
              "id": 2,
              "nickname": "레오",
              "containsPhoto": true,
              "isRead": false
            },
            {
              "id": 3,
              "nickname": "포스티",
              "containsPhoto": true,
              "isRead": true
            }
          ]
        """)
    List<GuestBookCardSimpleResponse> guestBookCards,

    @Schema(description = "현재 페이지 번호", example = "1")
    int currentPage,

    @Schema(description = "페이지 당 방명록 카드 개수", example = "15")
    int pageSize,

    @Schema(description = "총 방명록 카드 개수", example = "3")
    long totalCount,

    @Schema(description = "총 페이지 수", example = "1")
    int totalPages
) {

    public GuestBookResponse(Page<GuestBookCardSimpleResponse> guestBookCards) {
        this(guestBookCards.toList(),
            guestBookCards.getNumber() + 1,
            guestBookCards.getSize(),
            guestBookCards.getTotalElements(),
            guestBookCards.getTotalPages());
    }
}
