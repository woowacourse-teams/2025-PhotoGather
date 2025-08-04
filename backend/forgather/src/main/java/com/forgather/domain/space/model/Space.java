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

    @Column(name = "space_code", nullable = false, length = 64)
    private String spaceCode;

    @Column(name = "password", length = 64)
    private String password;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "opened_at", nullable = false)
    private LocalDateTime openedAt;

    @Column(name = "expired_at", nullable = false)
    private LocalDateTime expiredAt;

    public Space(String spaceCode, String password, String name, LocalDateTime openedAt) {
        this.spaceCode = spaceCode;
        this.password = password;
        this.name = name;
        this.openedAt = openedAt;
        this.expiredAt = openedAt.plusDays(3L);
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

    public boolean isExpired() {
        return expiredAt.isBefore(LocalDateTime.now());
    }
}
