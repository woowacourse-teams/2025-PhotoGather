package com.forgather.global.util;

import java.util.UUID;

import org.springframework.stereotype.Component;

@Component
public class RandomCodeGenerator {

    public String generate(int length) {
        if (length <= 0) {
            return "";
        }

        StringBuilder randomString = new StringBuilder();
        while (randomString.length() < length) {
            randomString.append(UUID.randomUUID().toString().replace("-", ""));
        }

        return randomString.substring(0, length);
    }
}
