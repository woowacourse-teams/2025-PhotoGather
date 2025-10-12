package com.forgather.domain.guestbook.dto;

public record WriteGuestBookCardPhotoRequest(
    String originalName,
    String uploadFileName,
    Long capacity
) {
}
