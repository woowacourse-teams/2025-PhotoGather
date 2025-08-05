package com.forgather.global.exception;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<ErrorResponse> handleIllegalArgumentException(IllegalArgumentException e) {
        var errorResponse = ErrorResponse.from(e.getMessage());
        return ResponseEntity.badRequest().body(errorResponse);
    }

    public record ErrorResponse(
        String message
    ) {
        public static ErrorResponse from(String message) {
            return new ErrorResponse(message);
        }
    }
}
