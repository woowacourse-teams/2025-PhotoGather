package com.forgather.domain.space.controller;

import static org.springframework.http.HttpStatus.CREATED;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.forgather.domain.space.dto.CreateSpaceRequest;
import com.forgather.domain.space.dto.CreateSpaceResponse;
import com.forgather.domain.space.dto.SpaceResponse;
import com.forgather.domain.space.service.SpaceService;
import com.forgather.global.auth.annotation.SessionHost;
import com.forgather.global.auth.domain.Host;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/spaces")
@Tag(name = "Space: 스페이스", description = "스페이스 관련 API")
public class SpaceController {

    private final SpaceService spaceService;

    @PostMapping
    @Operation(summary = "스페이스 생성", description = "새로운 스페이스를 생성합니다.")
    public ResponseEntity<CreateSpaceResponse> create(
        @RequestBody CreateSpaceRequest request,
        @SessionHost Host host
    ) {
        var response = spaceService.create(request, host);
        return ResponseEntity.status(CREATED).body(response);
    }

    @GetMapping("/{spaceCode}")
    @Operation(summary = "스페이스 조회", description = "스페이스 코드를 통해 스페이스 정보를 조회합니다.")
    public ResponseEntity<SpaceResponse> getSpaceInformation(@PathVariable(name = "spaceCode") String spaceCode) {
        var response = spaceService.getSpaceInformation(spaceCode);
        return ResponseEntity.ok(response);
    }
}
