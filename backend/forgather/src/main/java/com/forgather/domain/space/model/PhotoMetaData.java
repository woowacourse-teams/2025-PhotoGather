package com.forgather.domain.space.model;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Embeddable
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class PhotoMetaData {

    @Column(name = "captured_at")
    private LocalDateTime capturedAt;

    public PhotoMetaData(LocalDateTime capturedAt) {
        this.capturedAt = capturedAt;
    }
}
