package com.forgather.global.exception;

import org.springframework.http.HttpStatus;

public class BaseNullPointerException extends BaseException {

    public BaseNullPointerException(HttpStatus status) {
        super(status);
    }

    public BaseNullPointerException(String message) {
        super(message, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    public BaseNullPointerException(String message, HttpStatus status) {
        super(message, status);
    }

    public BaseNullPointerException(String message, int statusCode) {
        super(message, statusCode);
    }

    public BaseNullPointerException(String message, HttpStatus status, Throwable cause) {
        super(message, status, cause);
    }
}
