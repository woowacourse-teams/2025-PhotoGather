package com.forgather.domain.space.model;

import java.time.LocalDateTime;
import java.util.Objects;

import com.forgather.domain.model.BaseTimeEntity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
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

    /**
     * TODO
     * 성능을 미리 고려
     *
     * expiredAt랑 둘다 넣는거
     *
     * hours 단위로
     */
    @Column(name = "valid_days", nullable = false)
    private int validDays;

    @Column(name = "opened_at", nullable = false)
    private LocalDateTime openedAt;

    public Space(String code, String password, String name, int validDays, LocalDateTime openedAt) {
        this.code = code;
        this.password = password;
        this.name = name;
        this.openedAt = openedAt;
        this.validDays = validDays;
    }

    public void validateExpiration(LocalDateTime currentDateTime) {
        LocalDateTime expiredAt = openedAt.plusDays(validDays);
        if (expiredAt.isBefore(currentDateTime)) {
            throw new IllegalArgumentException("만료된 스페이스입니다. spaceCode: " + code);
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
}
