package com.forgather.domain.upload.service;

import java.io.IOException;
import java.util.Map;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.forgather.domain.upload.dto.IssueSignedUrlRequest;
import com.forgather.domain.upload.dto.IssueSignedUrlResponse;
import com.forgather.domain.space.repository.SpaceRepository;
import com.forgather.domain.upload.domain.ContentsStorage;
import com.forgather.domain.upload.domain.SignedUrlIssuer;
import com.forgather.global.exception.FileUploadException;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
@RequiredArgsConstructor
public class UploadService {

    private final SpaceRepository spaceRepository;
    private final ContentsStorage contentsStorage;
    private final SignedUrlIssuer signedUrlIssuer;

    public String upload(String spaceCode, MultipartFile file) {
        try {
            long startMillis = System.currentTimeMillis();
            log.info("파일 업로드 시작 spaceCode: {}, originalName: {}, size: {}",
                spaceCode, file.getOriginalFilename(), file.getSize());

            String path = contentsStorage.upload(spaceCode, file);

            long durationMillis = System.currentTimeMillis() - startMillis;
            log.info("파일 업로드 완료 spaceCode: {}, originalName: {}, size: {}, path: {}, duration: {}",
                spaceCode, file.getOriginalFilename(), file.getSize(), path, durationMillis + "ms");

            return path;
        } catch (IOException e) {
            throw new FileUploadException("파일 업로드 실패 spaceCode: %s, originalName: %s, size: %d".formatted(
                spaceCode, file.getOriginalFilename(), file.getSize()
            ), e);
        }
    }

    public IssueSignedUrlResponse issueSignedUrls(String spaceCode, IssueSignedUrlRequest request) {
        spaceRepository.getByCodeOrThrow(spaceCode);
        Map<String, String> signedUrls = signedUrlIssuer.issueSignedUrls(
            request.uploadFileNames(),
            spaceCode,
            request.category()
        );
        return new IssueSignedUrlResponse(signedUrls);
    }
}
