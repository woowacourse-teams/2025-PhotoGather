package com.forgather.fake;

import java.io.IOException;
import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.forgather.domain.model.Photo;
import com.forgather.domain.upload.domain.ContentsStorage;

/**
 * 테스트 중 필요한 경우 실제와 유사하게 구현한다.
 */
public class FakeContentStorage implements ContentsStorage {
    @Override
    public String upload(String spaceCode, MultipartFile file) throws IOException {
        return "";
    }

    @Override
    public void deleteContent(String contentPath) {

    }

    @Override
    public void deleteContents(List<String> contentPaths) {

    }

    @Override
    public String issueSignedUrl(String path) {
        return "test-prefix-" + path + "-test-suffix";
    }

    @Override
    public String getRootDirectory() {
        return "photogather/v2";
    }

    @Override
    public void deletePhotos(List<? extends Photo> deletedPhotos) {

    }
}
