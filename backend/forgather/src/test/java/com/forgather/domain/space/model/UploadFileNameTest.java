package com.forgather.domain.space.model;

import static org.assertj.core.api.Assertions.assertThatThrownBy;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.NullAndEmptySource;
import org.junit.jupiter.params.provider.ValueSource;

import com.forgather.global.exception.BaseException;

class UploadFileNameTest {

    @DisplayName("파일명이 유효하지 않으면 예외를 발생한다.")
    @NullAndEmptySource
    @ValueSource(strings = {".jpg", " .jpg", "name", "name.123", "/name.jpg"})
    @ParameterizedTest
    void validateUploadFileName(String invalidName) {
        assertThatThrownBy(() -> new UploadFileName(invalidName))
            .isInstanceOf(BaseException.class);
    }
}
