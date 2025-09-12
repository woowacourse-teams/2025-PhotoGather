package com.forgather.global.exception;

import org.springframework.http.HttpStatus;

public class UnauthorizedException extends BaseException {

    public UnauthorizedException() {
        super(HttpStatus.UNAUTHORIZED);
    }

    public UnauthorizedException(String message) {
        super(message, HttpStatus.UNAUTHORIZED);
    }

    public UnauthorizedException(String message, HttpStatus status) {
        super(message, status);
    }

    public UnauthorizedException(String message, int statusCode) {
        super(message, statusCode);
    }

    public UnauthorizedException(String message, Throwable cause) {
        super(message, HttpStatus.UNAUTHORIZED, cause);
    }

    public UnauthorizedException(String message, HttpStatus status, Throwable cause) {
        super(message, status, cause);
    }

    public UnauthorizedException(HttpStatus status) {
        super(status);
    }
}
