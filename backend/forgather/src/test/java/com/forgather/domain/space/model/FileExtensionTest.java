package com.forgather.domain.space.model;

import static org.junit.jupiter.api.Assertions.assertDoesNotThrow;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.ValueSource;

class FileExtensionTest {

    @ParameterizedTest
    @ValueSource(strings = {"jpg", "JPG", "heic", "HEIC"})
    @DisplayName("지원하는 확장자를 대소문자 구분없이 검증한다.")
    void existsExtensionIgnoreCase(String extension) {
        assertDoesNotThrow(() -> FileExtension.validate(extension));
    }
}
