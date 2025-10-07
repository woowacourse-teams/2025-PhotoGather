package com.forgather.domain.upload.service;

import java.io.IOException;
import java.util.Map;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.forgather.domain.space.dto.IssueSignedUrlRequest;
import com.forgather.domain.space.dto.IssueSignedUrlResponse;
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

    private static final int MAX_COUNT_PER_ISSUE = 100;

    private final SpaceRepository spaceRepository;
    private final ContentsStorage contentsStorage;
    private final GuestRepository guestRepository;
    // private final PhotoRepository photoRepository;

    @Transactional
    public void saveAll(String spaceCode, List<MultipartFile> multipartFiles, Long guestId) {
        Space space = spaceRepository.getByCodeOrThrow(spaceCode);
        Guest guest = guestRepository.getByIdOrThrow(guestId);
        for (MultipartFile multipartFile : multipartFiles) {
            PhotoMetaData metaData = MetaDataExtractor.extractPhotoMetaData(multipartFile);
            String uploadedPath = upload(spaceCode, multipartFile);
            // TODO: save photo
        }
    }

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
        if (request.uploadFileNames().size() > MAX_COUNT_PER_ISSUE) {
            throw new BaseException("한번에 발급 가능한 업로드 url 개수는 %d개 입니다.".formatted(MAX_COUNT_PER_ISSUE));
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
