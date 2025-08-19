package com.forgather.domain.space.service;

import static com.forgather.domain.space.util.FilePathGenerator.generateContentsFilePath;

import java.util.HashMap;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.forgather.domain.space.dto.IssueSignedUrlRequest;
import com.forgather.domain.space.dto.IssueSignedUrlResponse;
import com.forgather.domain.space.repository.SpaceRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UploadService {

    private static final int MAX_COUNT_PER_ISSUE = 100;

    private final SpaceRepository spaceRepository;
    private final ContentsStorage contentsStorage;

    public IssueSignedUrlResponse issueSignedUrls(String spaceCode, IssueSignedUrlRequest request) {
        spaceRepository.getUnexpiredSpaceByCode(spaceCode);
        if (request.uploadFileNames().size() > MAX_COUNT_PER_ISSUE) {
            throw new IllegalArgumentException("한번에 발급 가능한 최대 개수는 %d개 입니다.".formatted(MAX_COUNT_PER_ISSUE));
        }

        Map<String, String> signedUrls = new HashMap<>();
        for (String uploadFileName : request.uploadFileNames()) {
            String path = generateContentsFilePath(contentsStorage.getRootDirectory(), spaceCode, uploadFileName);
            String signedUrl = contentsStorage.issueSignedUrl(path);
            signedUrls.put(uploadFileName, signedUrl);
        }
        return new IssueSignedUrlResponse(signedUrls);
    }
}
