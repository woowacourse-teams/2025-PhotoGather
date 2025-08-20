package com.forgather.domain.space.model;

import java.time.LocalDateTime;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import com.forgather.domain.guest.model.Guest;

import jakarta.persistence.Column;
import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Embedded;
import jakarta.persistence.Entity;
import jakarta.persistence.EntityListeners;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PrimaryKeyJoinColumn;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Entity
@PrimaryKeyJoinColumn(name = "id")
@DiscriminatorValue("PHOTO")
@EntityListeners(AuditingEntityListener.class)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Photo extends SpaceContent {

    @Column(name = "original_name", nullable = false)
    private String originalName;

    @Column(name = "path", nullable = false)
    private String path;

    @Embedded
    private PhotoMetaData metaData;

    @Column(name = "capacity_value", nullable = false)
    private Long capacityValue; // bytes

    @CreatedDate
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    public Photo(Space space, Guest guest, String originalName, String path, PhotoMetaData metaData,
        long capacityValue) {
        super(space, guest);
        this.originalName = originalName;
        this.path = path;
        this.metaData = metaData;
        this.capacityValue = capacityValue;
    }

    @PrePersist
    void validate() {
        if (capacityValue <= 0L) {
            throw new IllegalArgumentException("사진 용량은 0보다 커야 합니다. 생성 시도 용량: " + capacityValue);
        }
    }

    public void validateSpace(Space other) {
        if (!space.equals(other)) {
            throw new IllegalArgumentException("스페이스에 속하지 않는 사진입니다. 스페이스 ID: " + space.getId() + ", 사진 ID: " + id);
        }
    }

    public LocalDateTime getCapturedAt() {
        if (metaData == null || metaData.getCapturedAt() == null) {
            return createdAt; // 메타데이터가 없으면 생성일자를 반환
        }
        return metaData.getCapturedAt();
    }
}
