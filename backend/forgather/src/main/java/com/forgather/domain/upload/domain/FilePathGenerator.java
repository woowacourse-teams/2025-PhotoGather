package com.forgather.domain.upload.domain;

import org.springframework.web.multipart.MultipartFile;

public class FilePathGenerator {

    private FilePathGenerator() {
    }

    public static String generateContentsFilePath(
        String rootDirectory,
        String spaceCode,
        UploadCategory category,
        String fileName
    ) {
        return "%s/%s/%s/%s/%s".formatted(
            rootDirectory,
            "spaces",
            spaceCode,
            category.toString(),
            fileName
        );
    }

    public static String generateContentsFilePath(
        String rootDirectory,
        String spaceCode,
        UploadCategory category,
        MultipartFile file
    ) {
        return generateContentsFilePath(rootDirectory, spaceCode, category, file.getOriginalFilename());
    }
}
