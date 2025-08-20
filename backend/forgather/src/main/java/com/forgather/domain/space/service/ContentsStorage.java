package com.forgather.domain.space.service;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.util.List;

import org.springframework.web.multipart.MultipartFile;

public interface ContentsStorage {

    String upload(String spaceCode, MultipartFile file) throws IOException;

    InputStream download(String photoPath);

    File downloadSelected(String tempPath, String spaceCode, List<String> photoPaths);

    void deleteContent(String contentPath);

    void deleteSelectedContents(List<String> contentPaths);

    String issueSignedUrl(String path);

    String getRootDirectory();
}
