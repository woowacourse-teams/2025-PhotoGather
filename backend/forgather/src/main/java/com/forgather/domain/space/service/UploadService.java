package com.forgather.domain.space.service;

import static com.forgather.domain.space.service.FilePathGenerator.generateContentsFilePath;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.IntStream;

import org.springframework.stereotype.Service;

import com.forgather.domain.space.dto.IssueSignedUrlRequest;
import com.forgather.domain.space.dto.IssueSignedUrlResponse;
import com.forgather.domain.space.repository.SpaceRepository;
import com.forgather.global.config.S3Properties;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UploadService {

    private final S3Properties s3Properties;
    private final SpaceRepository spaceRepository;
    private final ContentsStorage contentsStorage;

    public List<IssueSignedUrlResponse> issueSignedUrls(String spaceCode, IssueSignedUrlRequest request) {
        // 검증
        spaceRepository.getBySpaceCode(spaceCode);

        // filePath 생성
        Map<String, Integer> extensions = request.extensions();
        List<IssueSignedUrlResponse> responses = new ArrayList<>();
        for (String extension : extensions.keySet()) {
            List<IssueSignedUrlResponse> signedUrlsForExtension = IntStream.range(0, extensions.get(extension))
                .mapToObj(i -> generateContentsFilePath(s3Properties.getRootDirectory(), spaceCode, extension))
                .map(path -> contentsStorage.issueSignedUrl(spaceCode, extension)) // signedUrl 발급
                .map(signedUrl -> new IssueSignedUrlResponse(signedUrl, extension))
                .toList();
            responses.addAll(signedUrlsForExtension);
        }
        return responses;
    }
}
