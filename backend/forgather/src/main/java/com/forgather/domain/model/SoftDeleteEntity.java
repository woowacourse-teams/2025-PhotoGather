package com.forgather.domain.model;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.MappedSuperclass;
import lombok.Getter;

@Getter
@MappedSuperclass
public class SoftDeleteEntity extends BaseTimeEntity {

    @Column(name = "deleted_at")
    private LocalDateTime deletedAt;

    public void delete() {
        if (deletedAt != null) {
            return;
        }
        deletedAt = LocalDateTime.now();
    }
}
