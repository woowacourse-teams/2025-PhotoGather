package com.forgather.domain.space.model;

import java.time.LocalDateTime;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import jakarta.persistence.Column;
import jakarta.persistence.DiscriminatorValue;
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

    @Column(name = "captured_at")
    private LocalDateTime capturedAt;

    @CreatedDate
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    public Photo(Space space, String path, String originalName, LocalDateTime capturedAt) {
        super(space);
        this.path = path;
        this.originalName = originalName;
        this.capturedAt = capturedAt;
    }

    public void validateSpace(Space space) {
        if (!this.space.equals(space)) {
            throw new IllegalArgumentException();
        }
    }
}
