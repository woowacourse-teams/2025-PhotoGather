package com.forgather.domain.space.model;

import java.util.Arrays;

public enum FileExtension {
    JPG("jpg"),
    JPEG("jpeg"),
    PNG("png"),
    HEIC("heic"),
    HEIF("heif"),
    WEBP("webp"),
    AVIF("avif"),
    ;

    private final String value;

    FileExtension(String value) {
        this.value = value;
    }

    public static void validate(String extension) {
        if (!isExists(extension)) {
            throw new IllegalArgumentException("지원하지 않는 확장자입니다.");
        }
    }

    private static boolean isExists(String extension) {
        return Arrays.stream(values())
            .anyMatch(ext -> ext.value.equalsIgnoreCase(extension));
    }
}
