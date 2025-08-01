package com.forgather.domain.space.service;

import java.util.Map;

import org.springframework.stereotype.Service;

import com.forgather.domain.space.dto.IssueSignedUrlRequest;
import com.forgather.domain.space.dto.IssueSignedUrlResponse;
import com.forgather.domain.space.repository.SpaceRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UploadService {

    private final SpaceRepository spaceRepository;
    private final SignedUrlGenerator signedUrlGenerator;

    public IssueSignedUrlResponse issueSignedUrls(String spaceCode, IssueSignedUrlRequest request) {
        spaceRepository.getBySpaceCode(spaceCode);
        Map<String, String> signedUrls = signedUrlGenerator.generateByExtensions(spaceCode, request.extensions());
        return new IssueSignedUrlResponse(signedUrls);
    }
}
