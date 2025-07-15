package com.forgather.domain.space.model;

import java.time.LocalDateTime;

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

    @Column(name = "host_code", nullable = false, length = 64)
    private String hostCode;

    @Column(name = "guest_code", nullable = false, length = 64)
    private String guestCode;

    @Column(name = "password", length = 64)
    private String password;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "opened_at", nullable = false)
    private LocalDateTime openedAt;

    @Column(name = "expired_at", nullable = false)
    private LocalDateTime expiredAt;

    public Space(String hostCode, String guestCode, String password, String name, LocalDateTime openedAt) {
        this.hostCode = hostCode;
        this.guestCode = guestCode;
        this.password = password;
        this.name = name;
        this.openedAt = openedAt;
        this.expiredAt = openedAt.plusDays(3L);
    }
}
