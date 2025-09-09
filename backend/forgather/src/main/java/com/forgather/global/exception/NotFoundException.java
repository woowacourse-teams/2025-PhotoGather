package com.forgather.global.exception;

import org.springframework.http.HttpStatus;

public class NotFoundException extends BaseException{

    public NotFoundException(String message) {
        super(message, HttpStatus.NOT_FOUND);
    }
}
