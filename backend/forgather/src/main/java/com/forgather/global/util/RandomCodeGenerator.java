package com.forgather.global.util;

import java.security.SecureRandom;

import org.springframework.stereotype.Component;

@Component
public class RandomCodeGenerator {

    private static final String NUMBER_AND_ALPHABET = "0123456789abcdefghijklmnopqrstuvwxyz";
    private static final SecureRandom RANDOM = new SecureRandom();

    public String generate(int length) {
        if (length <= 0) {
            return "";
        }
        StringBuilder randomString = new StringBuilder();
        for (int i = 0; i < length; i++) {
            randomString.append(NUMBER_AND_ALPHABET.charAt(
                RANDOM.nextInt(NUMBER_AND_ALPHABET.length())
            ));
        }
        return randomString.toString();
    }
}
