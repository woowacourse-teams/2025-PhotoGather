package com.forgather.domain.guestbook.model;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

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
}
