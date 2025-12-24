package com.forgather.back_office.controller;

import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.forgather.back_office.annotation.Admin;
import com.forgather.back_office.dto.AdminHostResponse;
import com.forgather.back_office.model.AdminUser;
import com.forgather.back_office.service.AdminHostService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/admin")
@RequiredArgsConstructor
public class AdminHostController {

    private final AdminHostService adminHostService;

    @GetMapping("/hosts")
    public ResponseEntity<AdminHostResponse> getAllHosts(
        @PageableDefault(size = 15, sort = {"id"}, direction = Sort.Direction.DESC)
        Pageable pageable,
        @Admin AdminUser adminUser
    ) {
        var response = adminHostService.getAllHosts(pageable);
        return ResponseEntity.ok(response);
    }
}
