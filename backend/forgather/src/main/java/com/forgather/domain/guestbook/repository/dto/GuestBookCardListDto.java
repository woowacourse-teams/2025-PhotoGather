package com.forgather.domain.guestbook.repository.dto;

public record GuestBookCardListDto(
    Long id,
    String nickname,
    boolean isRead,
    boolean isPhotoExists
) {
}
