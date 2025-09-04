package com.forgather.global.exception;

import static org.springframework.http.MediaType.APPLICATION_JSON;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.HttpMediaTypeNotSupportedException;
import org.springframework.web.HttpRequestMethodNotSupportedException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.MissingRequestCookieException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.multipart.MaxUploadSizeExceededException;
import org.springframework.web.multipart.MultipartException;
import org.springframework.web.servlet.resource.NoResourceFoundException;

import io.jsonwebtoken.JwtException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestControllerAdvice
@RequiredArgsConstructor
public class GlobalExceptionHandler {

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ErrorResponse> handleMethodArgumentNotValidException(MethodArgumentNotValidException e) {
        logClientError(e);
        return ResponseEntity.status(e.getStatusCode())
            .contentType(APPLICATION_JSON)
            .body(ErrorResponse.from(e.getMessage()));
    }

    @ExceptionHandler(HttpMediaTypeNotSupportedException.class)
    public ResponseEntity<ErrorResponse> handleHttpMediaTypeNotSupportedException(
        HttpMediaTypeNotSupportedException e
    ) {
        logClientError(e);
        return ResponseEntity.status(e.getStatusCode())
            .contentType(APPLICATION_JSON)
            .body(ErrorResponse.from(e.getMessage()));
    }

    @ExceptionHandler(MultipartException.class)
    public ResponseEntity<ErrorResponse> handleMultipartException(MultipartException e) {
        logClientError(e);
        return ResponseEntity.status(400)
            .contentType(APPLICATION_JSON)
            .body(ErrorResponse.from(e.getMessage()));
    }

    @ExceptionHandler(MaxUploadSizeExceededException.class)
    public ResponseEntity<ErrorResponse> handleMaxUploadSizeExceededException(MaxUploadSizeExceededException e) {
        logClientError(e);
        return ResponseEntity.status(e.getStatusCode())
            .contentType(APPLICATION_JSON)
            .body(ErrorResponse.from(e.getMessage()));
    }

    @ExceptionHandler(MissingRequestCookieException.class)
    public ResponseEntity<ErrorResponse> handleMissingRequestCookieException(MissingRequestCookieException e) {
        logClientError(e);
        return ResponseEntity.status(e.getStatusCode())
            .contentType(APPLICATION_JSON)
            .body(ErrorResponse.from("필요한 쿠키가 누락되었습니다: " + e.getCookieName()));
    }

    @ExceptionHandler(HttpRequestMethodNotSupportedException.class)
    public ResponseEntity<ErrorResponse> handleHttpRequestMethodNotSupportedException(
        HttpRequestMethodNotSupportedException e
    ) {
        logClientError(e);
        return ResponseEntity.status(e.getStatusCode())
            .contentType(APPLICATION_JSON)
            .body(ErrorResponse.from(e.getMessage()));
    }

    @ExceptionHandler(JwtException.class)
    public ResponseEntity<ErrorResponse> handleJwtException(JwtException e) {
        logClientError(e);
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
            .contentType(APPLICATION_JSON)
            .body(ErrorResponse.from("인증 토큰이 유효하지 않습니다."));
    }

    @ExceptionHandler(NoResourceFoundException.class)
    public ResponseEntity<ErrorResponse> handleNoResourceFoundException(NoResourceFoundException e) {
        logClientError(e);
        var errorResponse = ErrorResponse.from(e.getMessage());
        return ResponseEntity.status(e.getStatusCode())
            .contentType(APPLICATION_JSON)
            .body(errorResponse);
    }

    @ExceptionHandler(BaseException.class)
    public ResponseEntity<ErrorResponse> handleBaseException(BaseException e) {
        if (e.isClientError()) {
            logClientError(e);
        } else {
            logServerError(e);
        }

        return ResponseEntity.status(e.getStatusCode())
            .contentType(APPLICATION_JSON)
            .body(ErrorResponse.from(e.getMessage()));
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorResponse> handleException(Exception e) {
        logServerError(e);
        return ResponseEntity.internalServerError()
            .contentType(APPLICATION_JSON)
            .body(ErrorResponse.from(e.getMessage()));
    }

    private void logClientError(Exception e) {
        log.atWarn().log("{}: {}", e.getClass().getSimpleName(), e.getMessage());
    }

    private void logServerError(Exception e) {
        log.atError().setCause(e).log("{}: {}", e.getClass().getSimpleName(), e.getMessage());
    }

    public record ErrorResponse(String message) {
        public static ErrorResponse from(String message) {
            return new ErrorResponse(message);
        }
    }
}
