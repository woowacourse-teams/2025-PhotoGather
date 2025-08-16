package com.forgather.domain.space.service;

import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

public class FilePathGenerator {

    private static final String CONTENTS_INNER_PATH = "contents";

    public static String generateContentsFilePath(String rootDirectory, String spaceCode, String fileName) {
        return String.format("%s/%s/%s/%s", rootDirectory, CONTENTS_INNER_PATH, spaceCode, fileName);
    }

    public static String generateContentsFilePath(String rootDirectory, String spaceCode, MultipartFile file) {
        String extension = StringUtils.getFilenameExtension(file.getOriginalFilename());
        return generateContentsFilePath(rootDirectory, spaceCode, extension);
    }
}
