package com.forgather.global.exception;

import org.springframework.dao.InvalidDataAccessApiUsageException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.servlet.resource.NoResourceFoundException;

import com.forgather.global.logging.Logger;

import lombok.RequiredArgsConstructor;

@RestControllerAdvice
@RequiredArgsConstructor
public class GlobalExceptionHandler {

    private final Logger logger;

    @ExceptionHandler({IllegalArgumentException.class, IllegalStateException.class,
        InvalidDataAccessApiUsageException.class})
    public ResponseEntity<ErrorResponse> handleIllegalException(RuntimeException e) {
        var errorResponse = ErrorResponse.from(e.getMessage());
        logger.log()
            .message(e.getClass() + ": " + e.getMessage())
            .info();
        return ResponseEntity.badRequest().body(errorResponse);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorResponse> handleException(Exception e) {
        var errorResponse = ErrorResponse.from(e.getMessage());
        logger.log()
            .message(e.getClass() + ": " + e.getMessage())
            .error();
        return ResponseEntity.internalServerError().body(errorResponse);
    }

    // 정적 리소스를 찾지 못해서 발생하는 예외는, WARN 레벨로 로깅. (favicon 때문에 항상 뜸)
    @ExceptionHandler(NoResourceFoundException.class)
    public ResponseEntity<ErrorResponse> handleNoResourceFoundException(NoResourceFoundException e) {
        logger.log()
            .message(e.getClass() + ": " + e.getMessage())
            .warn();
        return ResponseEntity.notFound().build();
    }

    public record ErrorResponse(
        String message
    ) {
        public static ErrorResponse from(String message) {
            return new ErrorResponse(message);
        }
    }
}
