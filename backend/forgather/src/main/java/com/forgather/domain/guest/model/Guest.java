package com.forgather.domain.guest.model;

import com.forgather.domain.model.BaseTimeEntity;
import com.forgather.domain.space.model.Space;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Guest extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "space_id", nullable = false)
    private Space space;

    @Column(name = "name", length = 100)
    private String name;

    public Guest(Space space, String name) {
        this.space = space;
        this.name = name;
        validate();
    }

    public void rename(String name) {
        this.name = name;
        validate();
    }

    @PrePersist
    @PreUpdate
    private void validate() {
        if (space == null) {
            throw new IllegalArgumentException("스페이스가 설정되지 않았습니다.");
        }
        if (name == null || name.isEmpty()) {
            throw new IllegalArgumentException("게스트 이름이 비어있습니다.");
        }
        if (name.length() > 10) {
            throw new IllegalArgumentException("게스트 이름은 10자를 초과할 수 없습니다.");
        }
    }
}
