package com.forgather.domain.space.controller;


import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.forgather.domain.space.dto.PhotoResponse;
import com.forgather.domain.space.dto.PhotosResponse;
import com.forgather.domain.space.service.PhotoService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/spaces/host/{hostCode}/photos")
public class HostPhotoController {

    private final PhotoService photoService;

    @GetMapping("/{photoId}")
    public ResponseEntity<PhotoResponse> get(
        @PathVariable(name = "hostCode") String hostCode,
        @PathVariable(name = "photoId") Long photoId
    ) {
        var response = photoService.get(hostCode, photoId);
        return ResponseEntity.ok(response);
    }

    @GetMapping
    public ResponseEntity<PhotosResponse> getAll(
        @PathVariable(name = "hostCode") String hostCode,
        @PageableDefault(size = 15, sort = "createdAt", direction = Sort.Direction.DESC) Pageable pageable
    ) {
        var response = photoService.getAll(hostCode, pageable);
        return ResponseEntity.ok(response);
    }
}
