package com.forgather.domain.space.model;

import java.time.LocalDateTime;
import java.util.Objects;

import com.forgather.domain.model.BaseTimeEntity;
import com.forgather.global.auth.domain.Host;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
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

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "host_id", nullable = false)
    private Host host;

    @Column(name = "code", nullable = false, length = 64)
    private String code;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "valid_hours", nullable = false)
    private int validHours;

    @Column(name = "opened_at", nullable = false)
    private LocalDateTime openedAt;

    public Space(Host host, String code, String name, int validHours, LocalDateTime openedAt) {
        this.host = host;
        this.code = code;
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

    public boolean isHost(Host host) {
        return host != null && Objects.equals(this.host.getId(), host.getId());
    }

    public boolean isExpired(LocalDateTime now) {
        return getExpiredAt().isBefore(now);
    }

    public LocalDateTime getExpiredAt() {
        return openedAt.plusHours(validHours);
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
