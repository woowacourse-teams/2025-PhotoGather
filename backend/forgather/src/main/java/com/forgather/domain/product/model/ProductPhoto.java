package com.forgather.domain.product.model;

import com.forgather.domain.space.model.Photo;
import com.forgather.global.exception.BaseException;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ProductPhoto extends Photo implements Comparable<ProductPhoto> {

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "product_id", nullable = false)
    private Product product;

    @Column(name = "sort_order", nullable = false)
    private int sortOrder;

    // TODO 파라미터 검증
    public ProductPhoto(long id, Product product, String originalName, String path, long capacity, int order) {
        super(id, originalName, path, capacity);
        this.product = product;
        this.sortOrder = order;
    }

    public ProductPhoto(Product product, String originalName, String path, long capacity, int order) {
        super(originalName, path, capacity);
        this.product = product;
        this.sortOrder = order;
    }

    public void changeOrder(int order) {
        if (order < 1) {
            throw new BaseException("정렬 순서는 1 이상이어야 합니다. order: " + order);
        }
        sortOrder = order;
    }

    @Override
    public int compareTo(ProductPhoto productPhoto) {
        return Integer.compare(sortOrder, productPhoto.sortOrder);
    }
}
