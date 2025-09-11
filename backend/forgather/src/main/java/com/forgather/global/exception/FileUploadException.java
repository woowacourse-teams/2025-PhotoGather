package com.forgather.global.exception;

import org.springframework.http.HttpStatus;

public class FileUploadException extends BaseException{

    public FileUploadException(String message, Throwable cause) {
        super(message, HttpStatus.INTERNAL_SERVER_ERROR, cause);
    }
}
