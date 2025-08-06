package com.forgather.global.auth.domain;

import java.time.LocalDateTime;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import com.forgather.global.util.RandomCodeGenerator;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EntityListeners;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

/**
 * 생성: 소셜 로그인 시
 * 사용 범위: /auth/**
 * 삭제: 로그아웃 요청 시 삭제되며, 만료된 토큰은 스케줄러에 의해 매일 일괄 삭제된다.
 */
@Entity
@Getter
@Table(name = "refresh_token")
@EntityListeners(AuditingEntityListener.class)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class RefreshToken {

    private static final int TOKEN_LENGTH = 64;
    private static final int EXPIRES_DAYS = 90;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "host_id")
    private Host host;

    @Column(name = "token", nullable = false)
    private String token;

    @Column(name = "expired_at", nullable = false)
    private LocalDateTime expiredAt;

    @CreatedDate
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    private RefreshToken(Host host, String token, LocalDateTime expiredAt) {
        this.host = host;
        this.token = token;
        this.expiredAt = expiredAt;
    }

    public static RefreshToken generate(Host host, RandomCodeGenerator randomCodeGenerator) {
        return new RefreshToken(host, randomCodeGenerator.generate(TOKEN_LENGTH),
            LocalDateTime.now().plusDays(EXPIRES_DAYS));
    }

    public boolean isExpired(LocalDateTime now) {
        return now.isAfter(expiredAt);
    }
}
