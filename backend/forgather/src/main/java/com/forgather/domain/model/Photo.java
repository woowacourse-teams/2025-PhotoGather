package com.forgather.domain.model;

import jakarta.persistence.Column;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.MappedSuperclass;
import lombok.Getter;

/**
 * TODO
 * 아래 엔티티들은 이 클래스 상속
 * guest_book_card_photo
 * product_photo
 * space_photo
 */
@Getter
@MappedSuperclass
public abstract class Photo extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "original_name", nullable = false)
    private String originalName;

    @Column(name = "path", nullable = false)
    private String path;

    @Column(name = "capacity", nullable = false)
    private Long capacity; // bytes
}
