package com.forgather.global.exception;

import org.springframework.http.HttpStatus;

public class UnauthenticatedException extends BaseException {

    public UnauthenticatedException() {
        super(HttpStatus.FORBIDDEN);
    }

    public UnauthenticatedException(String message) {
        super(message, HttpStatus.FORBIDDEN);
    }

    public UnauthenticatedException(String message, HttpStatus status) {
        super(message, status);
    }

    public UnauthenticatedException(String message, int statusCode) {
        super(message, statusCode);
    }

    public UnauthenticatedException(String message, Throwable cause) {
        super(message, HttpStatus.FORBIDDEN, cause);
    }

    public UnauthenticatedException(String message, HttpStatus status, Throwable cause) {
        super(message, status, cause);
    }

    public UnauthenticatedException(HttpStatus status) {
        super(status);
    }
}
