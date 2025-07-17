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
@RequestMapping("/spaces/{spaceCode}/photos")
public class PhotoController {

    private final PhotoService photoService;

    @GetMapping("/{photoId}")
    public ResponseEntity<PhotoResponse> get(
        @PathVariable(name = "spaceCode") String spaceCode,
        @PathVariable(name = "photoId") Long photoId
    ) {
        var response = photoService.get(spaceCode, photoId);
        return ResponseEntity.ok(response);
    }

    @GetMapping
    public ResponseEntity<PhotosResponse> getAll(
        @PathVariable(name = "spaceCode") String spaceCode,
        @PageableDefault(size = 15, sort = "createdAt", direction = Sort.Direction.DESC) Pageable pageable
    ) {
        var response = photoService.getAll(spaceCode, pageable);
        return ResponseEntity.ok(response);
    }
}
