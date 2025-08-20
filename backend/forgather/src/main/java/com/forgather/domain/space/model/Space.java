package com.forgather.domain.space.model;

import java.time.LocalDateTime;
import java.util.Objects;

import com.forgather.domain.model.BaseTimeEntity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Entity
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Space extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "code", nullable = false, length = 64)
    private String code;

    @Column(name = "password", length = 64)
    private String password;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "valid_hours", nullable = false)
    private int validHours;

    @Column(name = "opened_at", nullable = false)
    private LocalDateTime openedAt;

    public Space(String code, String password, String name, int validHours, LocalDateTime openedAt) {
        this.code = code;
        this.password = password;
        this.name = name;
        this.openedAt = openedAt;
        this.validHours = validHours;
    }

    public void validateExpiration(LocalDateTime currentDateTime) {
        LocalDateTime expiredAt = openedAt.plusHours(validHours);
        if (expiredAt.isBefore(currentDateTime)) {
            throw new IllegalArgumentException("만료된 스페이스입니다. code: " + code);
        }
    }

    public boolean isExpired(LocalDateTime now) {
        return getExpiredAt().isBefore(now);
    }

    public LocalDateTime getExpiredAt() {
        return openedAt.plusHours(validHours);
    }

    @PrePersist
    @PreUpdate
    void validate() {
        if (name == null || name.isBlank()) {
            throw new IllegalArgumentException("스페이스 이름은 비어있을 수 없습니다. 생성 시도 이름: " + name);
        }
        if (name.length() > 10) {
            throw new IllegalArgumentException("스페이스 이름은 10자를 초과할 수 없습니다. 생성 시도 이름: " + name);
        }
        if (openedAt == null) {
            throw new IllegalArgumentException("스페이스 오픈 시각은 비어있을 수 없습니다.");
        }

        // 네트워크 지연 고려해서 1시간 과거 생성까지는 허용
        if (openedAt.isBefore(LocalDateTime.now().minusHours(1L))) {
            throw new IllegalArgumentException("스페이스 오픈 시각은 현재 시각 이후여야 합니다. 생성 시도 시각: " + openedAt);
        }
    }

    @Override
    public boolean equals(Object object) {
        if (object == null || getClass() != object.getClass())
            return false;
        Space space = (Space)object;
        return Objects.equals(id, space.id);
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }

    public void validateCode(String code) {
        if (!this.code.equals(code)) {
            throw new IllegalArgumentException("스페이스 코드가 잘못되었습니다.");
        }
    }
}
