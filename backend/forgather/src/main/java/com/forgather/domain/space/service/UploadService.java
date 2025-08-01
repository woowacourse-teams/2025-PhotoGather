package com.forgather.domain.space.service;

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

    private final SpaceRepository spaceRepository;
    private final AwsS3Cloud awsS3Cloud;

    public IssueSignedUrlResponse issueSignedUrls(String spaceCode, IssueSignedUrlRequest request) {
        spaceRepository.getBySpaceCode(spaceCode);
        Map<String, Integer> extensions = request.extensions();

        Map<String, String> singedUrls = new HashMap<>();
        for (Map.Entry<String, Integer> entry : extensions.entrySet()) {
            String extension = entry.getKey();
            int count = entry.getValue();
            for (int i = 0; i < count; i++) {
                String signedUrl = awsS3Cloud.issueSignedUrl(spaceCode, extension);
                singedUrls.put(signedUrl, extension);
            }
        }
        return new IssueSignedUrlResponse(singedUrls);
    }
}
