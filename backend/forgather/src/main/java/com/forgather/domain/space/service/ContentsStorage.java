package com.forgather.domain.space.service;

import java.io.File;
import java.io.IOException;

import org.springframework.web.multipart.MultipartFile;

public interface ContentsStorage {

    String upload(String spaceCode, MultipartFile file) throws IOException;

    File downloadAll(String tempPath, String spaceCode);

    String issueSignedUrl(String spaceCode, String extension);
}
