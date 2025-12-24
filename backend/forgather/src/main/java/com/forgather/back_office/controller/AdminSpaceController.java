package com.forgather.back_office.controller;

import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.forgather.back_office.annotation.Admin;
import com.forgather.back_office.dto.AdminSpaceFilterRequest;
import com.forgather.back_office.dto.AdminSpaceResponse;
import com.forgather.back_office.dto.SpaceDetailResponse;
import com.forgather.back_office.model.AdminUser;
import com.forgather.back_office.service.AdminSpaceService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/admin/spaces")
@RequiredArgsConstructor
public class AdminSpaceController {

    private final AdminSpaceService adminSpaceService;

    @GetMapping
    public ResponseEntity<AdminSpaceResponse> getAllSpaces(
        @PageableDefault(size = 15, sort = {"createdAt"}, direction = Sort.Direction.DESC)
        Pageable pageable,
        @Admin AdminUser adminUser
    ) {
        var response = adminSpaceService.getAllSpaces(pageable);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/search")
    public ResponseEntity<AdminSpaceResponse> getSpacesByFilters(
        @PageableDefault(size = 15, sort = {"createdAt"}, direction = Sort.Direction.DESC)
        Pageable pageable,
        @ModelAttribute AdminSpaceFilterRequest request,
        @Admin AdminUser adminUser
    ) {
        var response = adminSpaceService.getSpacesByFilters(request, pageable);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/{spaceCode}")
    public ResponseEntity<SpaceDetailResponse> getSpaceDetail(
        @PathVariable(name = "spaceCode") String spaceCode,
        @Admin AdminUser adminUser
    ) {
        var response = adminSpaceService.getSpaceDetail(spaceCode);
        return ResponseEntity.ok(response);
    }
}
