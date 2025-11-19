package com.forgather.back_office.model;

import com.forgather.domain.model.BaseTimeEntity;
import com.forgather.global.exception.BaseNullPointerException;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class AdminUser extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String username;

    @Column(nullable = false)
    private String password;

    public AdminUser(String username, String password) {
        validateRequiredFields(username, password);
        this.username = username;
        this.password = password;
    }

    private void validateRequiredFields(String username, String password) {
        if (username == null) {
            throw new BaseNullPointerException("어드민 유저네임은 null일 수 없습니다.");
        }
        if (password == null) {
            throw new BaseNullPointerException("어드민 패스워드는 null일 수 없습니다.");
        }
    }

    public boolean checkPassword(String password) {
        return this.password.equals(password);
    }
}
