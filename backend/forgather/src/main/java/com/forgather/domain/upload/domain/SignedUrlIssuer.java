package com.forgather.domain.upload.domain;

import static com.forgather.domain.upload.domain.FilePathGenerator.generateContentsFilePath;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Component;

import com.forgather.global.exception.BaseException;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Component
public class SignedUrlIssuer {

    private static final int MAX_COUNT_PER_ISSUE = 100;

    private final ContentsStorage contentsStorage;

    public Map<String, String> issueSignedUrls(
        List<String> uploadFileNames,
        String spaceCode,
        UploadCategory category
    ) {
        validateSize(uploadFileNames);
        Map<String, String> signedUrls = new HashMap<>();
        for (String uploadFileName : uploadFileNames) {
            String filePath = getFilePath(spaceCode, category, uploadFileName);
            String signedUrl = contentsStorage.issueSignedUrl(filePath);
            signedUrls.put(uploadFileName, signedUrl);
        }
        return signedUrls;
    }

    private void validateSize(List<String> uploadFileNames) {
        if (uploadFileNames.size() > MAX_COUNT_PER_ISSUE) {
            throw new BaseException("한번에 발급 가능한 업로드 url 개수는 %d개 입니다.".formatted(MAX_COUNT_PER_ISSUE));
        }
    }

    private String getFilePath(String spaceCode, UploadCategory category, String uploadFileName) {
        return generateContentsFilePath(
            contentsStorage.getRootDirectory(),
            spaceCode,
            category,
            uploadFileName
        );
    }
}
