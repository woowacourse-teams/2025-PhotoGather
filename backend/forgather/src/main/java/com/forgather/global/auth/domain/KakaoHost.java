package com.forgather.global.auth.domain;

import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import jakarta.persistence.Column;
import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import jakarta.persistence.EntityListeners;
import jakarta.persistence.PrimaryKeyJoinColumn;
import jakarta.persistence.Table;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Entity
@Table(name = "host_kakao")
@PrimaryKeyJoinColumn(name = "id")
@DiscriminatorValue("KAKAO")
@EntityListeners(AuditingEntityListener.class)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class KakaoHost extends Host {

    @Column(name = "user_id", nullable = false)
    private String userId;

    @Column(name = "access_token")
    private String accessToken;

    @Column(name = "refresh_token")
    private String refreshToken;

    public KakaoHost(String name, String pictureUrl, String userId, String accessToken, String refreshToken) {
        super(name, pictureUrl);
        this.userId = userId;
        this.accessToken = accessToken;
        this.refreshToken = refreshToken;
    }

    @Override
    public void logout() {
        this.accessToken = null;
        this.refreshToken = null;
    }

    public void updateLoginTokens(String accessToken, String refreshToken) {
        this.accessToken = accessToken;
        this.refreshToken = refreshToken;
    }
}
