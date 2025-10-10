package com.forgather.domain.space.model;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class SpacePhoto extends Photo {

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "space_id", nullable = false)
    private Space space;

    public SpacePhoto(Space space, String originalName, String path, Long capacity) {
        this.space = space;
        this.originalName = originalName;
        this.path = path;
        this.capacity = capacity;
    }

    public static SpacePhoto empty() {
        return new SpacePhoto(null, "", "", 0L);
    }
}
