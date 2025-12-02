package com.forgather.global.util;

import java.util.concurrent.ThreadLocalRandom;

import org.springframework.stereotype.Component;

@Component
public class RandomCodeGenerator {

    private static final String NUMBER_AND_ALPHABET = "0123456789abcdefghijklmnopqrstuvwxyz";

    public String generate(int length) {
        if (length <= 0) {
            return "";
        }
        StringBuilder randomString = new StringBuilder();
        ThreadLocalRandom random = ThreadLocalRandom.current();
        for (int i = 0; i < length; i++) {
            randomString.append(NUMBER_AND_ALPHABET.charAt(
                random.nextInt(NUMBER_AND_ALPHABET.length())
            ));
        }
        return randomString.toString();
    }
}
