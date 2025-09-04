package com.forgather.global.exception;

import org.springframework.http.HttpStatus;

public class BaseException extends RuntimeException {

    private final HttpStatus status;

    public BaseException() {
        super();
        this.status = HttpStatus.BAD_REQUEST;
    }

    public BaseException(HttpStatus status) {
        super();
        this.status = status;
    }

    public BaseException(String message) {
        super(message);
        this.status = HttpStatus.BAD_REQUEST;
    }

    public BaseException(String message, HttpStatus status) {
        super(message);
        this.status = status;
    }

    public BaseException(String message, int statusCode) {
        super(message);
        this.status = HttpStatus.valueOf(statusCode);
    }

    public boolean isClientError() {
        return status.is4xxClientError();
    }

    public int getStatusCode() {
        return status.value();
    }
}
