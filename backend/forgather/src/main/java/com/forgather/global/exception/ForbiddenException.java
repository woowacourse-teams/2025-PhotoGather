package com.forgather.global.exception;

import org.springframework.http.HttpStatus;

public class ForbiddenException extends BaseException {

    public ForbiddenException(String message, Throwable cause) {
        super(message, HttpStatus.FORBIDDEN, cause);
    }

    public ForbiddenException(String message) {
        super(message, HttpStatus.FORBIDDEN);
    }

    public ForbiddenException(String message, HttpStatus status) {
        super(message, status);
    }

    public ForbiddenException(String message, int statusCode) {
        super(message, statusCode);
    }

    public ForbiddenException(String message, HttpStatus status, Throwable cause) {
        super(message, status, cause);
    }

    public ForbiddenException(HttpStatus status) {
        super(status);
    }
}
