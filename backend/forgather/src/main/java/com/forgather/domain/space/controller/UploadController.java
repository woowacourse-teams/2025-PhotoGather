package com.forgather.domain.space.controller;

import static org.springframework.http.HttpStatus.CREATED;
import static org.springframework.http.MediaType.APPLICATION_FORM_URLENCODED_VALUE;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.forgather.domain.space.dto.CancelUploadRequest;
import com.forgather.domain.space.dto.IssueSignedUrlRequest;
import com.forgather.domain.space.dto.IssueSignedUrlResponse;
import com.forgather.domain.space.dto.SaveUploadedPhotoRequest;
import com.forgather.domain.space.service.UploadService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/spaces/{spaceCode}/photos")
@Tag(name = "Upload: 사진 업로드", description = "사진 업로드 관련 API")
public class UploadController {

    private final UploadService uploadService;

    @Deprecated
    @PostMapping(path = "/upload", consumes = {"multipart/form-data"})
    @Operation(summary = "사진 일괄 업로드", description = "클라우드 저장소와 DB에 사진을 전부 업로드합니다.")
    public ResponseEntity<Void> uploadAll(
        @PathVariable(name = "spaceCode") String spaceCode,
        @RequestPart(name = "files") List<MultipartFile> files,
        @RequestParam(name = "guestId", required = false) Long guestId
    ) {
        uploadService.saveAll(spaceCode, files, guestId);
        return ResponseEntity.ok().build();
    }

    @PostMapping(path = "/issue/upload-urls")
    @Operation(summary = "업로드 URL 일괄 발급", description = "업로드 사진 별 서명된 URL을 발급합니다.")
    public ResponseEntity<IssueSignedUrlResponse> issuePreSignedUrls(
        @PathVariable(name = "spaceCode") String spaceCode,
        @RequestBody IssueSignedUrlRequest request
    ) {
        var response = uploadService.issueSignedUrls(spaceCode, request);
        return ResponseEntity.ok(response);
    }

    @PostMapping(value = "/upload/cancel", consumes = APPLICATION_FORM_URLENCODED_VALUE, produces = "application/json")
    @io.swagger.v3.oas.annotations.parameters.RequestBody(
        content = @Content(mediaType = APPLICATION_FORM_URLENCODED_VALUE,
            schema = @Schema(implementation = CancelUploadRequest.class)))
    @Operation(summary = "사진 업로드 취소", description = "업로드 취소 발생 시 클라우드 저장소에 업로드 된 사진들을 일괄 삭제합니다.")
    public ResponseEntity<Void> cancelUpload(
        @PathVariable String spaceCode,
        @ModelAttribute CancelUploadRequest request,
        @RequestParam(name = "guestId", required = false) Long guestId
    ) {
        uploadService.cancelUpload(spaceCode, request, guestId);
        return ResponseEntity.noContent().build();
    }

    @PostMapping
    @Operation(summary = "업로드 된 사진 정보 일괄 저장", description = "업로드 된 사진 정보를 DB에 저장합니다.")
    public ResponseEntity<Void> saveAll(
        @PathVariable(name = "spaceCode") String spaceCode,
        @RequestBody SaveUploadedPhotoRequest request,
        @RequestParam(name = "guestId", required = false) Long guestId
    ) {
        uploadService.saveUploadedPhotos(spaceCode, request, guestId);
        return ResponseEntity.status(CREATED).build();
    }
}
