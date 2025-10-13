package com.forgather.domain.upload.domain;

import java.util.UUID;

import org.springframework.util.StringUtils;
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
        return generateContentsFilePath(rootDirectory, spaceCode, category, makeUploadFileName(file));
    }

    private static String makeUploadFileName(MultipartFile file) {
        String uploadFileName = UUID.randomUUID().toString();
        String extension = StringUtils.getFilenameExtension(file.getOriginalFilename());
        return "%s.%s".formatted(uploadFileName, extension);
    }
}
