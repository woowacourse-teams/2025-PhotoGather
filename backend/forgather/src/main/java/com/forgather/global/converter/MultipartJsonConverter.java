package com.forgather.global.converter;

import java.io.IOException;
import java.lang.reflect.Type;

import org.springframework.http.HttpInputMessage;
import org.springframework.http.MediaType;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;

import com.fasterxml.jackson.databind.ObjectMapper;

/**
 * text/plain, application/octet-stream으로 전송된 JSON을 파싱하는 컨버터
 */
public class MultipartJsonConverter extends MappingJackson2HttpMessageConverter {

    public MultipartJsonConverter(ObjectMapper objectMapper) {
        super(objectMapper);
    }

    @Override
    public boolean canRead(Type type, Class<?> contextClass, MediaType mediaType) {
        if (mediaType == null) {
            return false;
        }

        // text/plain, application/octet-stream 처리
        if (MediaType.TEXT_PLAIN.isCompatibleWith(mediaType) ||
            MediaType.APPLICATION_OCTET_STREAM.isCompatibleWith(mediaType)) {

            // String, primitive 타입은 제외
            if (type instanceof Class<?> clazz) {
                if (clazz == String.class ||
                    clazz.isPrimitive() ||
                    Number.class.isAssignableFrom(clazz) ||
                    clazz == byte[].class) {
                    return false;
                }
            }

            // JSON으로 파싱 가능한 타입만 처리
            return super.canRead(type, contextClass, MediaType.APPLICATION_JSON);
        }

        return super.canRead(type, contextClass, mediaType);
    }

    @Override
    public Object read(Type type, Class<?> contextClass, HttpInputMessage inputMessage)
        throws IOException, HttpMessageNotReadableException {
        return super.read(type, contextClass, inputMessage);
    }
}
