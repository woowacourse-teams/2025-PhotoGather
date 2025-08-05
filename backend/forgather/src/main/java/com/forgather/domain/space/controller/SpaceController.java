package com.forgather.domain.space.controller;

import static org.springframework.http.HttpStatus.CREATED;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.forgather.domain.space.dto.CreateSpaceRequest;
import com.forgather.domain.space.dto.CreateSpaceResponse;
import com.forgather.domain.space.service.SpaceService;

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
    public ResponseEntity<CreateSpaceResponse> create(@RequestBody CreateSpaceRequest request) {
        var response = spaceService.create(request);
        return ResponseEntity.status(CREATED).body(response);
    }
}
