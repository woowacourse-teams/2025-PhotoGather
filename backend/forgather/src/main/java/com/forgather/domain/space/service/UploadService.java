package com.forgather.domain.space.service;

import static com.forgather.domain.space.util.FilePathGenerator.generateContentsFilePath;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.forgather.domain.space.dto.IssueSignedUrlRequest;
import com.forgather.domain.space.dto.IssueSignedUrlResponse;
import com.forgather.domain.space.model.Photo;
import com.forgather.domain.space.model.PhotoMetaData;
import com.forgather.domain.space.model.Space;
import com.forgather.domain.space.repository.PhotoRepository;
import com.forgather.domain.space.repository.SpaceRepository;
import com.forgather.domain.space.util.MetaDataExtractor;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
@RequiredArgsConstructor
public class UploadService {

    private static final int MAX_COUNT_PER_ISSUE = 100;

    private final SpaceRepository spaceRepository;
    private final PhotoRepository photoRepository;
    private final ContentsStorage contentsStorage;

    /**
     * TODO
     * S3 업로드 이후 실패 시 롤백 고려
     * (MVP아님)
     */
    @Transactional
    public void saveAll(String spaceCode, List<MultipartFile> multipartFiles) {
        Space space = spaceRepository.getUnexpiredSpaceByCode(spaceCode);
        for (MultipartFile multipartFile : multipartFiles) {
            PhotoMetaData metaData = MetaDataExtractor.extractPhotoMetaData(multipartFile);
            String uploadedPath = upload(spaceCode, multipartFile);
            photoRepository.save(new Photo(space, multipartFile.getOriginalFilename(), uploadedPath, metaData));
        }
    }

    private String upload(String spaceCode, MultipartFile multipartFile) {
        try {
            log.atDebug()
                .addKeyValue("spaceCode", spaceCode)
                .addKeyValue("originalName", multipartFile.getOriginalFilename())
                .log("파일 업로드 시작");
            return contentsStorage.upload(spaceCode, multipartFile);
        } catch (IOException e) {
            throw new IllegalArgumentException(
                "파일 업로드에 실패했습니다. 파일 이름: " + multipartFile.getOriginalFilename(), e);
        }
    }

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

