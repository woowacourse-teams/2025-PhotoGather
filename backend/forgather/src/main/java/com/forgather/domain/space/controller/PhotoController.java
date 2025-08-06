package com.forgather.domain.space.controller;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.nio.charset.StandardCharsets;
import java.util.List;

import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ContentDisposition;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.method.annotation.StreamingResponseBody;

import com.forgather.domain.space.dto.PhotoResponse;
import com.forgather.domain.space.dto.PhotosResponse;
import com.forgather.domain.space.service.PhotoService;
import com.forgather.global.logging.LogFormatter;
import com.forgather.global.logging.Logger;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/spaces/{spaceCode}/photos")
@Tag(name = "Photo: 사진", description = "사진 관련 API")
public class PhotoController {

    private static final String ZIP_CONTENT_TYPE = "application/zip";

    private final PhotoService photoService;
    private final Logger logger;

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

    @GetMapping(value = "/download", produces = ZIP_CONTENT_TYPE)
    @Operation(summary = "사진 zip 일괄 다운로드", description = "특정 공간의 사진 목록을 zip 파일로 다운로드합니다.")
    public ResponseEntity<StreamingResponseBody> downloadAll(@PathVariable(name = "spaceCode") String spaceCode)
        throws IOException {
        File zipFile = photoService.compressAll(spaceCode);

        ContentDisposition contentDisposition = ContentDisposition.attachment()
            .filename(zipFile.getName(), StandardCharsets.UTF_8)
            .build();
        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.setContentDisposition(contentDisposition);
        httpHeaders.setContentType(MediaType.valueOf(ZIP_CONTENT_TYPE));

        StreamingResponseBody responseBody = outputStream -> {
            try (InputStream inputStream = new FileInputStream(zipFile)) {
                byte[] buffer = new byte[4096];
                int bytesRead;
                while ((bytesRead = inputStream.read(buffer)) != -1) {
                    outputStream.write(buffer, 0, bytesRead);
                }
                outputStream.flush();
            } finally {
                if (zipFile.exists() && !zipFile.delete()) {
                    logger.log()
                        .event("압축 파일 삭제 실패")
                        .value("zipPath", zipFile.getAbsolutePath())
                        .info();
                }
            }
        };

        return ResponseEntity.ok()
            .headers(httpHeaders)
            .body(responseBody);
    }

    @DeleteMapping("/{photoId}")
    @Operation(summary = "사진 단건 삭제", description = "특정 공간의 단건 사진을 삭제합니다.")
    public ResponseEntity<Void> delete(
        @PathVariable(name = "spaceCode") String spaceCode,
        @PathVariable(name = "photoId") Long photoId
    ) {
        photoService.delete(spaceCode, photoId);
        return ResponseEntity.noContent()
            .build();
    }

    @DeleteMapping("/selected")
    @Operation(summary = "사진 선택 삭제", description = "특정 공간의 선택된 사진을 삭제합니다.")
    public ResponseEntity<Void> deleteSelected(
        @PathVariable(name = "spaceCode") String spaceCode,
        @RequestParam(name = "photoIds") List<Long> photoIds
    ) {
        photoService.deleteSelected(spaceCode, photoIds);
        return ResponseEntity.noContent()
            .build();
    }

    @DeleteMapping
    @Operation(summary = "사진 일괄 삭제", description = "특정 공간의 사진을 일괄 삭제합니다.")
    public ResponseEntity<Void> deleteAll(
        @PathVariable(name = "spaceCode") String spaceCode
    ) {
        photoService.deleteAll(spaceCode);
        return ResponseEntity.noContent()
            .build();
    }
}
