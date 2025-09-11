package com.forgather.global.exception;

import org.springframework.http.HttpStatus;

public class FileDownloadException extends BaseException {

    public FileDownloadException(String message) {
        super(message, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    public FileDownloadException(String message, Throwable cause) {
        super(message, HttpStatus.INTERNAL_SERVER_ERROR, cause);
    }
}
