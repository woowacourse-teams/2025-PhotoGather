package com.forgather.domain.guestbook.model;

import org.springframework.http.HttpStatus;

import com.forgather.domain.model.SoftDeleteEntity;
import com.forgather.global.exception.BaseException;
import com.forgather.global.exception.BaseNullPointerException;
import com.forgather.global.util.TextLengthCounter;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Guest extends SoftDeleteEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "nickname", length = 10, nullable = false)
    private String nickname;

    public Guest(String nickname) {
        validateRequiredFields(nickname);
        validateNickname(nickname);
        this.nickname = nickname;
    }

    private void validateRequiredFields(String nickname) {
        if (nickname == null) {
            throw new BaseNullPointerException("방문자 닉네임은 null일 수 없습니다.", HttpStatus.BAD_REQUEST);
        }
    }

    private void validateNickname(String nickname) {
        if (nickname.isBlank()) {
            throw new BaseException("방문자 닉네임은 공백만 입력할 수 없습니다.");
        }
        int length = TextLengthCounter.count(nickname);
        if (length > 10) {
            throw new BaseException("방문자 닉네임은 최대 10자까지 입력 가능합니다. nickname.length: " + length);
        }
    }
}
