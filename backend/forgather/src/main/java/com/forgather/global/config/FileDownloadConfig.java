package com.forgather.global.config;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import lombok.RequiredArgsConstructor;

@Configuration
@RequiredArgsConstructor
public class FileDownloadConfig {

    private final FileDownloadProperties fileDownloadProperties;

    @Bean
    public Path downloadTempPath() {
        Path tempDir = Paths.get(fileDownloadProperties.getPath());
        try {
            Files.createDirectories(tempDir);
        } catch (IOException e) {
            throw new IllegalStateException("임시 다운로드 디렉토리 생성 실패: " + tempDir, e);
        }
        return tempDir;
    }
}
