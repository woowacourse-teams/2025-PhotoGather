package com.forgather.global.util;

import java.text.BreakIterator;

public class TextLengthCounter {

    private TextLengthCounter() {
    }

    /**
     * 텍스트의 길이 계산, 이모지의 길이도 1로 계산
     */
    public static int count(String text) {
        if (text == null) {
            throw new IllegalArgumentException("");
        }
        BreakIterator iterator = BreakIterator.getCharacterInstance();
        iterator.setText(text);
        int count = 0;
        while (iterator.next() != BreakIterator.DONE) {
            count++;
        }
        return count;
    }
}
