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

    public KakaoHost(String name, String pictureUrl, String userId) {
        super(name, pictureUrl);
        this.userId = userId;
    }
}
