package com.forgather.domain.space.controller;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.List;

import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ContentDisposition;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.forgather.domain.space.dto.PhotoResponse;
import com.forgather.domain.space.dto.PhotosResponse;
import com.forgather.domain.space.service.PhotoService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/spaces/{spaceCode}/photos")
@Tag(name = "Photo: 사진", description = "사진 관련 API")
public class PhotoController {

    private static final String APPLICATION_ZIP = "application/zip";

    private final PhotoService photoService;

    @PostMapping(path = "/upload", consumes = {"multipart/form-data"})
    @Operation(summary = "사진 일괄 업로드", description = "사진을 전부 업로드합니다.")
    public ResponseEntity<Void> saveAll(
        @PathVariable(name = "spaceCode") String spaceCode,
        @RequestPart(name = "files") List<MultipartFile> files
    ) {
        photoService.saveAll(spaceCode, files);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/{photoId}")
    @Operation(summary = "사진 조회", description = "특정 공간의 사진을 조회합니다.")
    public ResponseEntity<PhotoResponse> get(
        @PathVariable(name = "spaceCode") String spaceCode,
        @PathVariable(name = "photoId") Long photoId
    ) {
        var response = photoService.get(spaceCode, photoId);
        return ResponseEntity.ok(response);
    }

    @GetMapping
    @Operation(summary = "사진 목록 조회", description = "특정 공간의 사진 목록을 조회합니다.")
    public ResponseEntity<PhotosResponse> getAll(
        @PathVariable(name = "spaceCode") String spaceCode,
        @PageableDefault(size = 15, sort = "createdAt", direction = Sort.Direction.DESC) Pageable pageable
    ) {
        var response = photoService.getAll(spaceCode, pageable);
        return ResponseEntity.ok(response);
    }

    @GetMapping(value = "/download", produces = APPLICATION_ZIP)
    @Operation(summary = "사진 zip 일괄 다운로드", description = "특정 공간의 사진 목록을 zip 파일로 다운로드합니다.")
    public ResponseEntity<Resource> downloadAll(@PathVariable(name = "spaceCode") String spaceCode) throws IOException {
        File zipFile = photoService.downloadAll(spaceCode);

        var resource = new FileSystemResource(zipFile);
        if (!resource.exists()) {
            throw new FileNotFoundException();
        }

        ContentDisposition contentDisposition = ContentDisposition.attachment()
            .filename(zipFile.getName(), StandardCharsets.UTF_8)
            .build();
        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.setContentDisposition(contentDisposition);
        httpHeaders.setContentType(MediaType.valueOf(APPLICATION_ZIP));

        return ResponseEntity.ok()
            .headers(httpHeaders)
            .body(resource);
    }
}
