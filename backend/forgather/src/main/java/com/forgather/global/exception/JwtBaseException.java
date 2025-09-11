package com.forgather.global.exception;

import org.springframework.http.HttpStatus;

public class JwtBaseException extends BaseException{

    public JwtBaseException(String message, HttpStatus status) {
        super(message, status);
    }

    public JwtBaseException(String message, HttpStatus status, Throwable cause) {
        super(message, status, cause);
    }
}
