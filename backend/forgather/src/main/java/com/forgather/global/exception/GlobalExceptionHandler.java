package com.forgather.global.exception;

import static org.springframework.http.MediaType.APPLICATION_JSON;

import java.util.List;

import org.springframework.dao.InvalidDataAccessApiUsageException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.MissingRequestCookieException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.servlet.resource.NoResourceFoundException;

import io.jsonwebtoken.JwtException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestControllerAdvice
@RequiredArgsConstructor
public class GlobalExceptionHandler {

    private static final List<Class<? extends Exception>> BAD_REQUEST_EXCEPTIONS = List.of(
        IllegalArgumentException.class,
        IllegalStateException.class,
        InvalidDataAccessApiUsageException.class,
        MethodArgumentNotValidException.class,
        NoResourceFoundException.class
    );

    @ExceptionHandler(MissingRequestCookieException.class)
    public ResponseEntity<ErrorResponse> handleMissingRequestCookieException(MissingRequestCookieException e) {
        var errorResponse = ErrorResponse.from("필요한 쿠키가 누락되었습니다: " + e.getCookieName());
        log.atWarn().log(e.getClass() + ": " + e.getMessage());
        return ResponseEntity.badRequest()
            .contentType(APPLICATION_JSON)
            .body(errorResponse);
    }

    @ExceptionHandler(JwtException.class)
    public ResponseEntity<ErrorResponse> handleJwtException(JwtException e) {
        var errorResponse = ErrorResponse.from("인증 토큰이 유효하지 않습니다.");
        log.atWarn().log("JWT Exception: " + e.getMessage());
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
            .contentType(APPLICATION_JSON)
            .body(errorResponse);
    }

    @ExceptionHandler(UnauthorizedException.class)
    public ResponseEntity<ErrorResponse> handleUnauthorizedException(UnauthorizedException e) {
        var errorResponse = ErrorResponse.from("로그인이 필요합니다.");
        log.atWarn().log("Unauthorized: " + e.getMessage());
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
            .contentType(APPLICATION_JSON)
            .body(errorResponse);
    }

    @ExceptionHandler(ForbiddenException.class)
    public ResponseEntity<ErrorResponse> handleForbiddenException(ForbiddenException e) {
        var errorResponse = ErrorResponse.from(e.getMessage());
        log.atWarn().log("Forbidden: " + e.getMessage());
        return ResponseEntity.status(HttpStatus.FORBIDDEN)
            .contentType(APPLICATION_JSON)
            .body(errorResponse);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorResponse> handleException(Exception e) {
        if (BAD_REQUEST_EXCEPTIONS.contains(e.getClass())) {
            return handleExceptionToBadRequest(e);
        }
        return handleExceptionToInternalServerError(e);
    }

    private ResponseEntity<ErrorResponse> handleExceptionToBadRequest(Exception e) {
        var errorResponse = ErrorResponse.from(e.getMessage());
        log.atWarn().log(e.getClass() + ": " + e.getMessage());
        return ResponseEntity.badRequest()
            .contentType(APPLICATION_JSON)
            .body(errorResponse);
    }

    private ResponseEntity<ErrorResponse> handleExceptionToInternalServerError(Exception e) {
        var errorResponse = ErrorResponse.from(e.getMessage());
        log.atError().setCause(e).log("500 INTERNAL SERVER ERROR");
        return ResponseEntity.internalServerError()
            .contentType(APPLICATION_JSON)
            .body(errorResponse);
    }

    public record ErrorResponse(String message) {
        public static ErrorResponse from(String message) {
            return new ErrorResponse(message);
        }
    }
}
