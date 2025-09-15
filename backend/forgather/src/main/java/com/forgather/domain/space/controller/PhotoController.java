package com.forgather.domain.space.controller;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.nio.charset.StandardCharsets;

import org.springframework.core.io.InputStreamResource;
import org.springframework.core.io.Resource;
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
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.mvc.method.annotation.StreamingResponseBody;

import com.forgather.domain.space.dto.DeletePhotosRequest;
import com.forgather.domain.space.dto.DownloadPhotosRequest;
import com.forgather.domain.space.dto.DownloadUrlsResponse;
import com.forgather.domain.space.dto.PhotoResponse;
import com.forgather.domain.space.dto.PhotosResponse;
import com.forgather.domain.space.service.PhotoService;
import com.forgather.global.auth.annotation.LoginHost;
import com.forgather.global.auth.model.Host;

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

    @GetMapping("/{photoId}")
    @Operation(summary = "사진 조회", description = "특정 공간의 사진을 조회합니다.")
    public ResponseEntity<PhotoResponse> get(
        @PathVariable(name = "spaceCode") String spaceCode,
        @PathVariable(name = "photoId") Long photoId,
        @LoginHost(required = false) Host host
    ) {
        var response = photoService.get(spaceCode, photoId, host);
        return ResponseEntity.ok(response);
    }

    @GetMapping
    @Operation(summary = "사진 목록 조회", description = "특정 공간의 사진 목록을 조회합니다.")
    public ResponseEntity<PhotosResponse> getAll(
        @PathVariable(name = "spaceCode") String spaceCode,
        @PageableDefault(size = 15, sort = "createdAt", direction = Sort.Direction.DESC) Pageable pageable,
        @LoginHost(required = false) Host host
    ) {
        var response = photoService.getAll(spaceCode, pageable, host);
        return ResponseEntity.ok(response);
    }

    @Deprecated
    @PostMapping("/download/{photoId}")
    @Operation(summary = "사진 단일 다운로드", description = "특정 공간의 선택된 단일 사진을 다운로드합니다.")
    public ResponseEntity<Resource> download(
        @PathVariable(name = "spaceCode") String spaceCode,
        @PathVariable(name = "photoId") Long photoId,
        @LoginHost Host host
    ) {
        var response = photoService.download(spaceCode, photoId, host);
        ContentDisposition contentDisposition = ContentDisposition.attachment()
            .filename(response.name(), StandardCharsets.UTF_8)
            .build();
        HttpHeaders httpHeaders = new HttpHeaders();
        InputStreamResource body = new InputStreamResource(response.photoFile());
        httpHeaders.setContentDisposition(contentDisposition);
        httpHeaders.setContentType(MediaType.valueOf("image/" + response.extension()));

        return ResponseEntity.ok()
            .headers(httpHeaders)
            .body(body);
    }

    @Deprecated
    @PostMapping(value = "/download/selected", produces = ZIP_CONTENT_TYPE)
    @Operation(summary = "사진 zip 선택 다운로드", description = "특정 공간의 선택된 사진을 zip 파일로 다운로드합니다.")
    public ResponseEntity<StreamingResponseBody> downloadSelected(
        @PathVariable(name = "spaceCode") String spaceCode,
        @RequestBody DownloadPhotosRequest request,
        @LoginHost Host host
    ) throws IOException {
        File zipFile = photoService.compressSelected(spaceCode, request, host);

        ContentDisposition contentDisposition = ContentDisposition.attachment()
            .filename(zipFile.getName(), StandardCharsets.UTF_8)
            .build();
        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.setContentDisposition(contentDisposition);
        httpHeaders.setContentType(MediaType.valueOf(ZIP_CONTENT_TYPE));
        httpHeaders.setContentLength(zipFile.length());

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
                    log.info("파일 삭제 실패: {}", zipFile.getAbsolutePath());
                }
            }
        };

        return ResponseEntity.ok()
            .headers(httpHeaders)
            .body(responseBody);
    }

    @Deprecated
    @PostMapping(value = "/download", produces = ZIP_CONTENT_TYPE)
    @Operation(summary = "사진 zip 일괄 다운로드", description = "특정 공간의 사진 목록을 zip 파일로 다운로드합니다.")
    public ResponseEntity<StreamingResponseBody> downloadAll(
        @PathVariable(name = "spaceCode") String spaceCode,
        @LoginHost Host host
    ) throws IOException {
        File zipFile = photoService.compressAll(spaceCode, host);

        ContentDisposition contentDisposition = ContentDisposition.attachment()
            .filename(zipFile.getName(), StandardCharsets.UTF_8)
            .build();
        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.setContentDisposition(contentDisposition);
        httpHeaders.setContentType(MediaType.valueOf(ZIP_CONTENT_TYPE));
        httpHeaders.setContentLength(zipFile.length());

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
                    log.atDebug()
                        .addKeyValue("zipPath", zipFile.getAbsolutePath())
                        .log("압축 파일 삭제 실패");
                }
            }
        };

        return ResponseEntity.ok()
            .headers(httpHeaders)
            .body(responseBody);
    }

    @PostMapping("/issue/download-urls/{photoId}")
    @Operation(summary = "사진 단일 다운로드 URL", description = "특정 공간의 단일 사진 다운로드 URL을 생성합니다.")
    public ResponseEntity<DownloadUrlsResponse> getDownloadUrl(
        @PathVariable(name = "spaceCode") String spaceCode,
        @PathVariable(name = "photoId") Long photoId,
        @LoginHost(required = false) Host host
    ) {
        var response = photoService.getDownloadUrl(spaceCode, photoId, host);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/issue/download-urls/selected")
    @Operation(summary = "사진 선택 다운로드 URL", description = "특정 공간의 선택된 사진 다운로드 URL 목록을 생성합니다.")
    public ResponseEntity<DownloadUrlsResponse> getSelectedDownloadUrls(
        @PathVariable(name = "spaceCode") String spaceCode,
        @RequestBody DownloadPhotosRequest request,
        @LoginHost(required = false) Host host
    ) {
        var response = photoService.getSelectedDownloadUrls(spaceCode, request, host);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/issue/download-urls")
    @Operation(summary = "사진 일괄 다운로드 URL", description = "특정 공간의 모든 사진 다운로드 URL 목록을 생성합니다.")
    public ResponseEntity<DownloadUrlsResponse> getAllDownloadUrls(
        @PathVariable(name = "spaceCode") String spaceCode,
        @LoginHost(required = false) Host host
    ) {
        var response = photoService.getAllDownloadUrls(spaceCode, host);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{photoId}")
    @Operation(summary = "사진 단건 삭제", description = "특정 공간의 단건 사진을 삭제합니다.")
    public ResponseEntity<Void> delete(
        @PathVariable(name = "spaceCode") String spaceCode,
        @PathVariable(name = "photoId") Long photoId,
        @LoginHost Host host
    ) {
        photoService.delete(spaceCode, photoId, host);
        return ResponseEntity.noContent()
            .build();
    }

    @DeleteMapping("/selected")
    @Operation(summary = "사진 선택 삭제", description = "특정 공간의 선택된 사진을 삭제합니다.")
    public ResponseEntity<Void> deleteSelected(
        @PathVariable(name = "spaceCode") String spaceCode,
        @RequestBody DeletePhotosRequest request,
        @LoginHost Host host
    ) {
        photoService.deleteSelected(spaceCode, request, host);
        return ResponseEntity.noContent()
            .build();
    }
}
