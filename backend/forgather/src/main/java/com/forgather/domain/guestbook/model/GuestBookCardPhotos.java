package com.forgather.domain.guestbook.model;

import java.util.ArrayList;
import java.util.Collections;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import com.forgather.domain.model.Photo;
import com.forgather.global.exception.BaseException;

public class GuestBookCardPhotos {

    private static final int MAX_COUNT = 20;

    private final List<GuestBookCardPhoto> photos;

    public GuestBookCardPhotos(List<GuestBookCardPhoto> photos) {
        validateTotalCount(photos.size());
        this.photos = new ArrayList<>(photos);
    }

    private void validateTotalCount(int totalCount) {
        if (totalCount > MAX_COUNT) {
            throw new BaseException("방명록 카드 사진은 최대 %d개까지만 등록 가능합니다. count: %d".formatted(MAX_COUNT, totalCount));
        }
    }

    public List<GuestBookCardPhoto> getAll() {
        return Collections.unmodifiableList(photos);
    }

    public List<GuestBookCardPhoto> deleteByIds(List<Long> deleteIds) {
        validateIds(deleteIds);
        List<GuestBookCardPhoto> deletedPhotos = getDeletedPhotos(deleteIds);
        photos.removeAll(deletedPhotos);
        return deletedPhotos;
    }

    private void validateIds(List<Long> deleteIds) {
        Set<Long> photosIdSet = new HashSet<>(photos.stream().map(Photo::getId).toList());
        for (Long deleteId : deleteIds) {
            if (!photosIdSet.contains(deleteId)) {
                throw new BaseException("방명록 카드에 존재하지 않는 사진입니다. deletePhotoId: " + deleteId);
            }
        }
    }

    private List<GuestBookCardPhoto> getDeletedPhotos(List<Long> deleteIds) {
        Set<Long> deleteIdSet = new HashSet<>(deleteIds);
        List<GuestBookCardPhoto> deletedPhotos = photos.stream()
            .filter(photo -> deleteIdSet.contains(photo.getId()))
            .toList();
        return deletedPhotos;
    }
}
