package com.forgather.domain.upload.domain;

import java.io.IOException;
import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.forgather.domain.model.Photo;

public interface ContentsStorage {

    String upload(String spaceCode, MultipartFile file) throws IOException;

    void deleteContents(List<String> contentPaths);

    String issueSignedUrl(String path);

    String getRootDirectory();

    void deletePhotos(List<? extends Photo> deletedPhotos);
}
