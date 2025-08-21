package com.forgather.global.logging;

import java.io.ByteArrayInputStream;

import jakarta.servlet.ReadListener;
import jakarta.servlet.ServletInputStream;

public class CustomRequestBodyInputStream extends ServletInputStream {

    private final ByteArrayInputStream inputStream;

    public CustomRequestBodyInputStream(byte[] cachedBody) {
        inputStream = new ByteArrayInputStream(cachedBody);
    }

    @Override
    public boolean isFinished() {
        return inputStream.available() == 0;
    }

    @Override
    public boolean isReady() {
        return true;
    }

    @Override
    public void setReadListener(ReadListener listener) {
        throw new UnsupportedOperationException("지원하지 않습니다.");
    }

    @Override
    public int read() {
        return inputStream.read();
    }
}
