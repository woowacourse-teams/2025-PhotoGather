package com.forgather.domain.guestbook.model;

import com.forgather.domain.model.BaseTimeEntity;
import com.forgather.global.exception.BaseException;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Guest extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;

    @Column(name = "nickname", length = 100)
    private String nickname;

    public Guest(String nickname) {
        this.nickname = nickname;
        validate();
    }

    @PrePersist
    @PreUpdate
    private void validate() {
        if (nickname == null || nickname.isEmpty()) {
            throw new BaseException("게스트 이름이 비어있습니다.");
        }
        if (nickname.length() > 10) {
            throw new BaseException("게스트 이름은 10자를 초과할 수 없습니다.");
        }
    }
}
