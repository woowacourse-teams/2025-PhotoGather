package com.forgather.domain.guestbook.model;

import com.forgather.domain.model.Photo;
import com.forgather.global.exception.BaseNullPointerException;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class GuestBookCardPhoto extends Photo {

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "guest_book_card_id", nullable = false)
    private GuestBookCard guestBookCard;

    public GuestBookCardPhoto(String originalName, String path, Long capacity, GuestBookCard guestBookCard) {
        super(originalName, path, capacity);
        validateRequiredFields(guestBookCard);
        this.guestBookCard = guestBookCard;
    }

    private void validateRequiredFields(GuestBookCard guestBookCard) {
        if (guestBookCard == null) {
            throw new BaseNullPointerException("방명록 카드는 null일 수 없습니다.");
        }
    }
}
