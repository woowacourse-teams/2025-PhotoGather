package com.forgather.global.logging;

import java.io.BufferedReader;
import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;

import org.springframework.util.StreamUtils;

import jakarta.servlet.ServletInputStream;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletRequestWrapper;

public class CustomRequestBodyWrapper extends HttpServletRequestWrapper {

    private final byte[] cachedBody;

    public CustomRequestBodyWrapper(HttpServletRequest request) throws IOException {
        super(request);
        ServletInputStream inputStream = request.getInputStream();
        cachedBody = StreamUtils.copyToByteArray(inputStream);
    }

    @Override
    public ServletInputStream getInputStream() {
        return new CustomRequestBodyInputStream(cachedBody);
    }

    @Override
    public BufferedReader getReader() {
        InputStream inputStream = new ByteArrayInputStream(cachedBody);
        return new BufferedReader(new InputStreamReader(inputStream));
    }
}
