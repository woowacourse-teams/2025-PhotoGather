package com.forgather.global.config;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class FileDownloadConfig {

    @Value("${app.download.temp.dir}")
    private String downloadTempPath;

    @Bean
    public Path downloadTempPath() {
        Path tempDir = Paths.get(downloadTempPath);
        try {
            Files.createDirectories(tempDir);
        } catch (IOException e) {
            throw new IllegalStateException("임시 다운로드 디렉토리 생성 실패: " + downloadTempPath, e);
        }
        return tempDir;
    }
}
