package com.forgather.domain.space.controller;

import static org.springframework.http.HttpStatus.CREATED;

import java.util.List;

import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.forgather.domain.space.dto.CreateSpaceRequest;
import com.forgather.domain.space.dto.CreateSpaceResponse;
import com.forgather.domain.space.dto.SpaceResponse;
import com.forgather.domain.space.dto.UpdateSpaceRequest;
import com.forgather.domain.space.service.SpaceService;
import com.forgather.global.auth.annotation.LoginHost;
import com.forgather.global.auth.model.Host;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Encoding;
import io.swagger.v3.oas.annotations.parameters.RequestBody;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/spaces")
@Tag(name = "Space: 스페이스", description = "스페이스 관련 API")
public class SpaceController {

    private final SpaceService spaceService;

    @RequestBody(content = @Content(
        encoding = @Encoding(name = "request", contentType = MediaType.APPLICATION_JSON_VALUE)))
    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @Operation(summary = "스페이스 생성", description = "새로운 스페이스를 생성합니다.")
    public ResponseEntity<CreateSpaceResponse> create(
        @RequestPart("request") @Validated CreateSpaceRequest request,
        @RequestPart(value = "file", required = false) MultipartFile file,
        @LoginHost(required = false) Host host
    ) {
        var response = spaceService.create(request, file, host);
        return ResponseEntity.status(CREATED).body(response);
    }

    @GetMapping("/{spaceCode}")
    @Operation(summary = "스페이스 조회", description = "스페이스 코드를 통해 스페이스 정보를 조회합니다.")
    public ResponseEntity<SpaceResponse> getSpaceInformation(@PathVariable(name = "spaceCode") String spaceCode) {
        var response = spaceService.getSpaceInformation(spaceCode);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{spaceCode}")
    @Operation(summary = "스페이스 삭제", description = "스페이스를 삭제합니다.")
    public ResponseEntity<Void> delete(@PathVariable(name = "spaceCode") String spaceCode,
        @LoginHost(required = false) Host host
    ) {
        spaceService.delete(spaceCode, host);
        return ResponseEntity.noContent().build();
    }

    @RequestBody(content = @Content(
        encoding = @Encoding(name = "request", contentType = MediaType.APPLICATION_JSON_VALUE)))
    @PatchMapping(value = "/{spaceCode}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @Operation(summary = "스페이스 정보 수정", description = "해당 스페이스 코드의 정보를 수정합니다.")
    public ResponseEntity<SpaceResponse> update(
        @PathVariable(name = "spaceCode") String spaceCode,
        @RequestPart("request") @Validated UpdateSpaceRequest request,
        @RequestPart(value = "file", required = false) MultipartFile file,
        @LoginHost(required = false) Host host
    ) {
        var response = spaceService.update(spaceCode, request, file, host);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/me")
    @Operation(summary = "호스트의 스페이스 목록 조회", description = "호스트 ID를 통해 해당 호스트의 스페이스 목록을 조회합니다.")
    public ResponseEntity<List<SpaceResponse>> getSpacesInformation(@LoginHost Host host) {
        List<SpaceResponse> response = spaceService.getSpacesInformation(host);
        return ResponseEntity.ok(response);
    }
}
