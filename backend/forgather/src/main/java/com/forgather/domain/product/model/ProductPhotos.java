package com.forgather.domain.product.model;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import com.forgather.global.exception.BaseException;

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
                throw new BaseException("작품 사진은 정렬 순서는 중복될 수 없습니다. order: " + now);
            }
            prev = now;
        }
    }

    public ProductPhotos() {
        this.productPhotos = new ArrayList<>();
    }

    public List<ProductPhoto> deleteByIds(List<Long> ids) {
        List<ProductPhoto> deletedPhotos = new ArrayList<>();
        for (ProductPhoto photo : productPhotos) {
            if (ids.contains(photo.getId())) {
                deletedPhotos.add(photo);
                pullAfter(photo.getSortOrder());
            }
        }
        productPhotos.removeAll(deletedPhotos);
        return Collections.unmodifiableList(deletedPhotos);
    }

    private void pullAfter(int order) {
        productPhotos.stream()
            .filter(photo -> photo.getSortOrder() > order)
            .forEach(ProductPhoto::pullOrder);
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
