package com.forgather.global.auth.service;

import org.springframework.stereotype.Service;

import com.forgather.global.config.PublicAccessProperties;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class PublicAccessService {

    private final PublicAccessProperties properties;

    public boolean canAccess(String spaceCode) {
        return properties.getPublicSpaceCodes().contains(spaceCode);
    }
}
