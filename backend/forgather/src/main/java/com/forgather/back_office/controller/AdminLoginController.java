package com.forgather.back_office.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.forgather.back_office.dto.AdminLoginRequest;
import com.forgather.back_office.dto.AdminLoginResponse;
import com.forgather.back_office.dto.AdminRefreshRequest;
import com.forgather.back_office.service.AdminLoginService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/admin")
@RequiredArgsConstructor
public class AdminLoginController {

    private final AdminLoginService adminLoginService;

    @PostMapping("/login")
    public ResponseEntity<AdminLoginResponse> login(@RequestBody AdminLoginRequest request) {
        var response = adminLoginService.login(request);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/refresh")
    public ResponseEntity<AdminLoginResponse> refresh(@RequestBody AdminRefreshRequest request) {
        var response = adminLoginService.refresh(request);
        return ResponseEntity.ok(response);
    }
}
