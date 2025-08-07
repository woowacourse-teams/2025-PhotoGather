package com.forgather.global.exception;

import java.util.Optional;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.forgather.global.logging.Logger;

import lombok.RequiredArgsConstructor;

@RestControllerAdvice
@RequiredArgsConstructor
public class GlobalExceptionHandler {

    private final Logger logger;

    @ExceptionHandler({IllegalArgumentException.class, IllegalStateException.class})
    public ResponseEntity<ErrorResponse> handleIllegalException(RuntimeException e) {
        var errorResponse = ErrorResponse.from(e.getMessage());
        logger.log()
            .message(Optional.ofNullable(e.getCause()).map(Object::toString).orElse("no cause"))
            .error();
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
