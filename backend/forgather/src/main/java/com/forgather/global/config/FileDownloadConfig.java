package com.forgather.global.config;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.forgather.global.exception.FileDownloadException;

import lombok.RequiredArgsConstructor;

@Configuration
@RequiredArgsConstructor
public class FileDownloadConfig {

    private final FileDownloadProperties fileDownloadProperties;

    @Bean
    public Path downloadTempPath() {
        Path tempPath = Paths.get(fileDownloadProperties.getPath());
        try {
            Files.createDirectories(tempPath);
        } catch (IOException e) {
            throw new FileDownloadException("임시 다운로드 디렉토리 생성 실패: " + tempPath, e);
        }
        return tempPath;
    }
}
