package com.forgather.domain.guestbook.model;

import org.springframework.http.HttpStatus;

import com.forgather.domain.model.BaseTimeEntity;
import com.forgather.domain.space.model.Space;
import com.forgather.global.exception.BaseException;
import com.forgather.global.exception.BaseNullPointerException;
import com.forgather.global.util.TextLengthCounter;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class GuestBookCard extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "space_id", nullable = false)
    private Space space;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "guest_id", nullable = false)
    private Guest guest;

    @Column(name = "message", length = 500, nullable = false)
    private String message;

    @Column(name = "is_read", nullable = false)
    private boolean isRead;

    public GuestBookCard(Space space, Guest guest, String message) {
        validateRequiredFields(space, guest, message);
        validateMessage(message);
        this.space = space;
        this.guest = guest;
        this.message = message;
        this.isRead = false;
    }

    private void validateRequiredFields(Space space, Guest guest, String message) {
        if (space == null) {
            throw new BaseNullPointerException("방명록 카드 스페이스는 null일 수 없습니다.");
        }
        if (guest == null) {
            throw new BaseNullPointerException("방명록 카드 방문자는 null일 수 없습니다.");
        }
        if (message == null) {
            throw new BaseNullPointerException("방명록 카드 메세지는 null일 수 없습니다.", HttpStatus.BAD_REQUEST);
        }
    }

    private void validateMessage(String message) {
        int length = TextLengthCounter.count(message);
        if (length > 400) {
            throw new BaseException("방명록 카드 메세지는 최대 400까지 입력 가능합니다. message.length: " + length);
        }
    }

    public String getNickname() {
        return guest.getNickname();
    }

    public boolean equalsSpace(Space other) {
        return space.equals(other);
    }

    public void read() {
        isRead = true;
    }
}
