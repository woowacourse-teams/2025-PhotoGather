package com.forgather.domain.product.model;

import java.util.ArrayList;
import java.util.Collections;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import com.forgather.global.exception.BaseException;

/**
 * 항상 productPhoto.sortOrder 기반 오름차순 정렬 유지.
 * productPhoto.sortOrder 중복 검증.
 * productPhotos#add/delete 시 productPhoto.sortOrder 조정.(정렬 순서는 1부터 시작)
 */
public class ProductPhotos {
    private final List<ProductPhoto> productPhotos;

    public ProductPhotos(List<ProductPhoto> productPhotos) {
        List<ProductPhoto> sortedProductPhotos = new ArrayList<>(productPhotos);
        sortedProductPhotos.sort(ProductPhoto::compareTo);
        validateDuplicateOrder(sortedProductPhotos);
        this.productPhotos = sortedProductPhotos;
    }

    private void validateDuplicateOrder(List<ProductPhoto> sortedProductPhotos) {
        if (sortedProductPhotos.isEmpty()) {
            return;
        }
        int prev = sortedProductPhotos.getFirst().getSortOrder();
        for (int i = 1; i < sortedProductPhotos.size(); i++) {
            int now = sortedProductPhotos.get(i).getSortOrder();
            if (prev == now) {
                throw new BaseException("작품 사진의 정렬 순서는 중복될 수 없습니다. order: " + now);
            }
            prev = now;
        }
    }

    public ProductPhotos() {
        this.productPhotos = new ArrayList<>();
    }

    public List<ProductPhoto> deleteByIds(List<Long> ids) {
        Set<Long> idSet = new HashSet<>(ids);
        List<ProductPhoto> deletedPhotos = productPhotos.stream()
            .filter(photo -> idSet.contains(photo.getId()))
            .toList();

        productPhotos.removeAll(deletedPhotos);
        reorderAll();
        return deletedPhotos;
    }

    private void reorderAll() {
        for (int i = 0; i < productPhotos.size(); i++) {
            productPhotos.get(i).changeOrder(i + 1);
        }
    }

    public void add(List<ProductPhoto> newPhotos) {
        for (ProductPhoto photo : newPhotos) {
            add(photo);
        }
    }

    public void add(ProductPhoto newPhoto) {
        int order = 1;
        if (!productPhotos.isEmpty()) {
            order = productPhotos.getLast().getSortOrder() + 1; // 정렬이 보장되기에 가능한 로직.
        }
        newPhoto.changeOrder(order);
        productPhotos.add(newPhoto);
    }

    public List<ProductPhoto> getAll() {
        return Collections.unmodifiableList(productPhotos);
    }
}
