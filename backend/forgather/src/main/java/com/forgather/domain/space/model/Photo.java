package com.forgather.domain.space.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import java.time.LocalDateTime;

import jakarta.persistence.JoinColumn;
import jakarta.persistence.MapsId;
import jakarta.persistence.OneToOne;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Entity
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Photo {

    @Id
    private Long id;

    @OneToOne
    @MapsId
    @JoinColumn(name = "id")
    private SpaceContent content;

    @Column(name = "path", nullable = false)
    private String path;

    @Column(name = "original_name", nullable = false)
    private String originalName;

    @Column(name = "captured_at")
    private LocalDateTime capturedAt;

    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt;

    public Photo(SpaceContent content, String path, String originalName, LocalDateTime capturedAt, LocalDateTime createdAt) {
        this.content = content;
        this.path = path;
        this.originalName = originalName;
        this.capturedAt = capturedAt;
        this.createdAt = createdAt;
    }

    public void validateHostCode(String hostCode) {
        if (!content.getSpace().getHostCode().equals(hostCode)) {
            throw new IllegalArgumentException();
        }
    }
}
