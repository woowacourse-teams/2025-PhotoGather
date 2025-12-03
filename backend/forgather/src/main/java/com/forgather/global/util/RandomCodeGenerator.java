package com.forgather.global.util;

import java.security.SecureRandom;

import org.springframework.stereotype.Component;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Component
public class RandomCodeGenerator {

    private static final String NUMBER_AND_ALPHABET = "0123456789abcdefghijklmnopqrstuvwxyz";
    private static final SecureRandom SECURE_RANDOM = new SecureRandom();

    public String generate(int length) {
        long startMillis = System.currentTimeMillis();
        if (length <= 0) {
            return "";
        }
        StringBuilder randomString = new StringBuilder();
        for (int i = 0; i < length; i++) {
            int randomPosition = SECURE_RANDOM.nextInt(NUMBER_AND_ALPHABET.length());
            randomString.append(NUMBER_AND_ALPHABET.charAt(randomPosition));
        }

        long durationMillis = System.currentTimeMillis() - startMillis;
        log.debug("랜덤 코드 생성 완료 생성 시간: {}ms", durationMillis);

        return randomString.toString();
    }
}
