package com.forgather.global.exception;

import org.springframework.http.HttpStatus;

public class JwtBaseException extends BaseException{

    public JwtBaseException(String message, HttpStatus status) {
        super(message, status);
    }

    public JwtBaseException(String message, int statusCode) {
        super(message, statusCode);
    }

    public JwtBaseException(String message, Throwable cause) {
        super(message, cause);
    }

    public JwtBaseException(String message, HttpStatus status, Throwable cause) {
        super(message, status, cause);
    }

    public JwtBaseException(HttpStatus status) {
        super(status);
    }

    public JwtBaseException(String message) {
        super(message);
    }
}
