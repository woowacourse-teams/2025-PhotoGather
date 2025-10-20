package com.forgather.domain.upload.domain;

public enum UploadCategory {
    PRODUCT,
    GUESTBOOK,
    SPACE
    ;

    @Override
    public String toString() {
        return name().toLowerCase();
    }
}
