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

    public BaseException(String message, Throwable cause) {
        super(message, cause);
        this.status = HttpStatus.BAD_REQUEST;
    }

    public BaseException(String message, HttpStatus status, Throwable cause) {
        super(message, cause);
        this.status = status;
    }

    public boolean isClientError() {
        return status.is4xxClientError();
    }

    public boolean isSecurityError() {
        return status.isSameCodeAs(HttpStatus.UNAUTHORIZED) || status.isSameCodeAs(HttpStatus.FORBIDDEN);
    }

    public int getStatusCode() {
        return status.value();
    }
}
