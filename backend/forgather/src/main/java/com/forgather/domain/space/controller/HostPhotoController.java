package com.forgather.domain.space.controller;

import com.forgather.domain.space.dto.PhotoResponse;
import com.forgather.domain.space.service.PhotoService;

import lombok.RequiredArgsConstructor;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
}
