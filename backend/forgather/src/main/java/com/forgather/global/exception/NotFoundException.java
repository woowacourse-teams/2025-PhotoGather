package com.forgather.global.exception;

import org.springframework.http.HttpStatus;

public class NotFoundException extends BaseException{

    public NotFoundException(String message) {
        super(message, HttpStatus.NOT_FOUND);
    }

    public NotFoundException(String message, HttpStatus status) {
        super(message, status);
    }

    public NotFoundException(String message, int statusCode) {
        super(message, statusCode);
    }

    public NotFoundException(String message, Throwable cause) {
        super(message, HttpStatus.NOT_FOUND, cause);
    }

    public NotFoundException(String message, HttpStatus status, Throwable cause) {
        super(message, status, cause);
    }

    public NotFoundException(HttpStatus status) {
        super(status);
    }
}
