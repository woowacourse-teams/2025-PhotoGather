package com.forgather.domain.space.model;

import java.time.LocalDateTime;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import jakarta.persistence.Column;
import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Embedded;
import jakarta.persistence.Entity;
import jakarta.persistence.EntityListeners;
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
public class Photo extends SpaceContent{

    @Column(name = "path", nullable = false)
    private String path;

    @Column(name = "original_name", nullable = false)
    private String originalName;

    @Embedded
    private PhotoMetaData metaData;

    @CreatedDate
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    public Photo(Space space, String path, String originalName, PhotoMetaData metaData) {
        super(space);
        this.path = path;
        this.originalName = originalName;
        this.metaData = metaData;
    }

    public void validateSpace(Space space) {
        if (!this.space.equals(space)) {
            throw new IllegalArgumentException("스페이스에 속하지 않는 사진입니다. 스페이스 ID: " + space.getId() + ", 사진 ID: " + this.getId());
        }
    }

    public LocalDateTime getCapturedAt() {
        return metaData.getCapturedAt();
    }
}
