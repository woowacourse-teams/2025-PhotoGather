package com.forgather.domain.upload.domain;

public enum UploadCategory {
    PRODUCT,
    GUESTBOOK
    ;

    @Override
    public String toString() {
        return name().toLowerCase();
    }
}
