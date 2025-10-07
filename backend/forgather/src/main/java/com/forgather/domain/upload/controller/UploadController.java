package com.forgather.domain.upload.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.forgather.domain.upload.dto.IssueSignedUrlRequest;
import com.forgather.domain.upload.dto.IssueSignedUrlResponse;
import com.forgather.domain.upload.service.UploadService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/spaces/{spaceCode}/upload")
@Tag(name = "Upload: 파일 업로드", description = "파일 업로드 관련 API")
public class UploadController {

    private final UploadService uploadService;

    /**
     * TODO
     * 아무런 검증이 없어도 되는가?
     */
    @PostMapping(path = "/signed-urls")
    @Operation(summary = "업로드 URL 발급", description = """
        업로드 파일 별 서명된 URL을 발급합니다.
        category는 업로드할 사진의 종류를 뜻합니다.
        작품 사진 : PRODUCT
        방명록 사진 : GUESTBOOK
    """)
    public ResponseEntity<IssueSignedUrlResponse> issuePreSignedUrls(
        @PathVariable(name = "spaceCode") String spaceCode,
        @RequestBody IssueSignedUrlRequest request
    ) {
        var response = uploadService.issueSignedUrls(spaceCode, request);
        return ResponseEntity.ok(response);
    }
}
