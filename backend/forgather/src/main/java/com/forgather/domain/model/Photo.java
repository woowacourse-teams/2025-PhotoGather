package com.forgather.domain.model;

import jakarta.persistence.Column;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.MappedSuperclass;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@MappedSuperclass
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public abstract class Photo extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    protected Long id;

    @Column(name = "original_name", nullable = false)
    protected String originalName;

    @Column(name = "path", nullable = false)
    protected String path;

    @Column(name = "capacity", nullable = false)
    protected Long capacity; // bytes

    // TODO 검증 추가
    protected Photo(String originalName, String path, Long capacity) {
        this.originalName = originalName;
        this.path = path;
        this.capacity = capacity;
    }

    public Photo(Long id, String originalName, String path, Long capacity) {
        this.id = id;
        this.originalName = originalName;
        this.path = path;
        this.capacity = capacity;
    }
}
