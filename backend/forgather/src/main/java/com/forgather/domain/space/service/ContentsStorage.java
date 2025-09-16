package com.forgather.domain.space.service;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.net.URL;
import java.util.List;

import org.springframework.web.multipart.MultipartFile;

public interface ContentsStorage {

    String upload(String spaceCode, MultipartFile file) throws IOException;

    InputStream download(String photoPath);

    File downloadSelected(String tempPath, String spaceCode, List<String> photoPaths);

    URL issueDownloadUrl(String photoPath);

    void deleteContent(String contentPath);

    void deleteContents(List<String> contentPaths);

    String issueSignedUrl(String path);

    String getRootDirectory();
}
