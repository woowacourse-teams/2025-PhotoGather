package com.forgather.domain.space.service;

import java.util.HashMap;
import java.util.Map;

import org.springframework.stereotype.Component;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class SignedUrlGenerator {

    private final ContentsStorage contentsStorage;

    public Map<String, String> generateByExtensions(String spaceCode, Map<String, Integer> extensions) {
        Map<String, String> signedUrls = new HashMap<>();
        for (Map.Entry<String, Integer> entry : extensions.entrySet()) {
            String extension = entry.getKey();
            int count = entry.getValue();
            for (int i = 0; i < count; i++) {
                String signedUrl = contentsStorage.issueSignedUrl(spaceCode, extension);
                signedUrls.put(signedUrl, extension);
            }
        }
        return signedUrls;
    }
}
