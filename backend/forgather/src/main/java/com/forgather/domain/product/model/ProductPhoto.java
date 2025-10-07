package com.forgather.domain.product.model;

import com.forgather.domain.space.model.Photo;
import com.forgather.global.exception.BaseException;
import com.forgather.global.exception.BaseNullPointerException;

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

    private static final int MIN_ORDER = 1;
    private static final int MAX_ORDER = 10;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "product_id", nullable = false)
    private Product product;

    @Column(name = "sort_order", nullable = false)
    private int sortOrder;

    public ProductPhoto(Long id, Product product, String originalName, String path, Long capacity, int order) {
        super(id, originalName, path, capacity);
        validateRequiredFields(product);
        validateOrder(order);
        this.product = product;
        this.sortOrder = order;
    }

    public ProductPhoto(Product product, String originalName, String path, Long capacity, int order) {
        super(originalName, path, capacity);
        validateRequiredFields(product);
        validateOrder(order);
        this.product = product;
        this.sortOrder = order;
    }

    private void validateRequiredFields(Product product) {
        if (product == null) {
            throw new BaseNullPointerException("작품 정보는 필수입니다.");
        }
    }

    public void changeOrder(int order) {
        validateOrder(order);
        sortOrder = order;
    }

    private void validateOrder(int order) {
        if (order < MIN_ORDER || order > MAX_ORDER) {
            throw new BaseException("작품 사진의 정렬 순서는 1 이상, 10 이하여야 합니다. order: " + order);
        }
    }

    @Override
    public int compareTo(ProductPhoto productPhoto) {
        return Integer.compare(sortOrder, productPhoto.sortOrder);
    }
}
