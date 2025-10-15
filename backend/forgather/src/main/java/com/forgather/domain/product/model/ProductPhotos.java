package com.forgather.domain.product.model;

import java.util.ArrayList;
import java.util.Collections;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import com.forgather.domain.model.Photo;
import com.forgather.global.exception.BaseException;

/**
 * 항상 productPhoto.sortOrder 기반 오름차순 정렬 유지.
 * productPhoto.sortOrder 중복 검증.
 * productPhotos#add/delete 시 productPhoto.sortOrder 조정.(정렬 순서는 1부터 시작)
 * 최대 10개까지만 보관.
 */
public class ProductPhotos {

    private static final int MAX_COUNT = 10;

    private final List<ProductPhoto> photos;

    public ProductPhotos(List<ProductPhoto> productPhotos) {
        validateTotalCount(productPhotos.size());
        List<ProductPhoto> sortedProductPhotos = new ArrayList<>(productPhotos);
        sortedProductPhotos.sort(ProductPhoto::compareTo);
        validateDuplicateOrder(sortedProductPhotos);
        this.photos = sortedProductPhotos;
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
        this.photos = new ArrayList<>();
    }

    public List<ProductPhoto> deleteByIds(List<Long> ids) {
        validateIds(ids);
        Set<Long> idSet = new HashSet<>(ids);
        List<ProductPhoto> deletedPhotos = photos.stream()
            .filter(photo -> idSet.contains(photo.getId()))
            .toList();

        photos.removeAll(deletedPhotos);
        reorderAll();
        return deletedPhotos;
    }

    private void validateIds(List<Long> deleteIds) {
        Set<Long> photosIdSet = new HashSet<>(photos.stream().map(Photo::getId).toList());
        for (Long deleteId : deleteIds) {
            if (!photosIdSet.contains(deleteId)) {
                throw new BaseException("작품에 존재하지 않는 사진입니다. deletePhotoId: " + deleteId);
            }
        }
    }

    private void reorderAll() {
        for (int i = 0; i < photos.size(); i++) {
            photos.get(i).changeOrder(i + 1);
        }
    }

    public void add(List<ProductPhoto> newPhotos) {
        validateTotalCount(photos.size() + newPhotos.size());
        for (ProductPhoto photo : newPhotos) {
            add(photo);
        }
    }

    public void add(ProductPhoto newPhoto) {
        validateTotalCount(photos.size() + 1);
        int order = 1;
        if (!photos.isEmpty()) {
            order = photos.getLast().getSortOrder() + 1; // 정렬이 보장되기에 가능한 로직.
        }
        newPhoto.changeOrder(order);
        photos.add(newPhoto);
    }

    private void validateTotalCount(int totalCount) {
        if (totalCount > MAX_COUNT) {
            throw new BaseException("작품 사진은 최대 %d개까지만 등록 가능합니다. count: ".formatted(MAX_COUNT) + totalCount);
        }
    }

    public List<ProductPhoto> getAll() {
        return Collections.unmodifiableList(photos);
    }
}
