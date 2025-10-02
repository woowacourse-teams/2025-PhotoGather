package com.forgather.v2.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ProductPhoto extends Photo {

    @Column(name = "sort_order", nullable = false)
    private int sortOrder;
}
