package com.forgather.domain.space.util;

import java.util.UUID;

import org.springframework.stereotype.Component;

@Component
public class RandomCodeGenerator {

    public String generate() {
        return UUID.randomUUID().toString().substring(0, 11).replace("-", "");
    }

    public String generate(int count) {
        return UUID.randomUUID().toString().substring(0, count).replace("-", "");
    }
}
