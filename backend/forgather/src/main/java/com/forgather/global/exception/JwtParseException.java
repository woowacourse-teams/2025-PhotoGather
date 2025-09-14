package com.forgather.global.exception;

import org.springframework.http.HttpStatus;

public class JwtParseException extends JwtBaseException {

    public JwtParseException(String message, HttpStatus status) {
        super(message, status);
    }

    public JwtParseException(String message, int statusCode) {
        super(message, statusCode);
    }

    public JwtParseException(String message, Throwable cause) {
        super(message, cause);
    }

    public JwtParseException(String message, HttpStatus status, Throwable cause) {
        super(message, status, cause);
    }

    public JwtParseException(HttpStatus status) {
        super(status);
    }

    public JwtParseException(String message) {
        super(message);
    }

}
