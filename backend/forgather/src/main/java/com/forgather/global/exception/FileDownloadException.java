package com.forgather.global.exception;

import org.springframework.http.HttpStatus;

public class FileDownloadException extends BaseException {

    public FileDownloadException(String message) {
        super(message, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    public FileDownloadException(HttpStatus status) {
        super(status);
    }

    public FileDownloadException(String message, Throwable cause) {
        super(message, HttpStatus.INTERNAL_SERVER_ERROR, cause);
    }

    public FileDownloadException(String message, HttpStatus status, Throwable cause) {
        super(message, status, cause);
    }

    public FileDownloadException(String message, int statusCode) {
        super(message, statusCode);
    }

    public FileDownloadException(String message, HttpStatus status) {
        super(message, status);
    }
}
