package com.forgather.global.exception;

import org.springframework.http.HttpStatus;

public class FileUploadException extends BaseException{

    public FileUploadException(String message, Throwable cause) {
        super(message, HttpStatus.INTERNAL_SERVER_ERROR, cause);
    }

    public FileUploadException(HttpStatus status) {
        super(status);
    }

    public FileUploadException(String message) {
        super(message, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    public FileUploadException(String message, HttpStatus status) {
        super(message, status);
    }

    public FileUploadException(String message, int statusCode) {
        super(message, statusCode);
    }

    public FileUploadException(String message, HttpStatus status, Throwable cause) {
        super(message, status, cause);
    }
}
