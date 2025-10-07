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

    private String upload(String spaceCode, MultipartFile multipartFile) {
        try {
            log.atInfo()
                .addKeyValue("spaceCode", spaceCode)
                .addKeyValue("originalName", multipartFile.getOriginalFilename())
                .log("파일 업로드 시작 {}, {}", spaceCode, multipartFile.getSize());
            return contentsStorage.upload(spaceCode, multipartFile);
        } catch (IOException e) {
            throw new FileUploadException("파일 업로드에 실패했습니다. 파일 이름: " + multipartFile.getOriginalFilename(), e);
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
