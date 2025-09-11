package com.forgather.global.exception;

import org.springframework.http.HttpStatus;

public class JwtParseException extends JwtBaseException {

    public JwtParseException(String message, HttpStatus status) {
        super(message, status);
    }
}
