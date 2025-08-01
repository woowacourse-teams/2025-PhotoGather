package com.forgather.domain.space.service;

import static org.assertj.core.api.Assertions.assertThat;

import java.io.File;
import java.io.IOException;
import java.util.Map;
import java.util.UUID;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.web.multipart.MultipartFile;

class SignedUrlGeneratorTest {

    @DisplayName("확장자 갯수 별로 Signed URL을 발급한다.")
    @Test
    void generateSignedUrlsByExtensionCounts() {
        // given
        SignedUrlGenerator signedUrlGenerator = new SignedUrlGenerator(new FakeContentsStorage());
        String spaceCode = "1234567890";
        Map<String, Integer> extensions = Map.of("jpg", 3, "png", 2, "heic", 1);

        // when
        Map<String, String> result = signedUrlGenerator.generateByExtensions(spaceCode, extensions);

        // then
        assertThat(result.values()).containsExactlyInAnyOrder(
            "jpg", "jpg", "jpg", "png", "png", "heic"
        );
    }

    static class FakeContentsStorage implements ContentsStorage {

        @Override
        public String upload(String spaceCode, MultipartFile file) throws IOException {
            return "";
        }

        @Override
        public File downloadAll(String tempPath, String spaceCode) {
            return null;
        }

        @Override
        public String issueSignedUrl(String spaceCode, String extension) {
            return UUID.randomUUID() + "." + extension;
        }
    }
}
