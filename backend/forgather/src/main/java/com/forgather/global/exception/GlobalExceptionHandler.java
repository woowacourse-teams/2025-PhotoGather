package com.forgather.global.exception;

import org.springframework.dao.InvalidDataAccessApiUsageException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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

    @ExceptionHandler({IllegalArgumentException.class, IllegalStateException.class,
        InvalidDataAccessApiUsageException.class})
    public ResponseEntity<ErrorResponse> handleIllegalException(RuntimeException e) {
        var errorResponse = ErrorResponse.from(e.getMessage());
        log.atWarn().log(e.getClass() + ": " + e.getMessage());
        return ResponseEntity.badRequest()
            .contentType(org.springframework.http.MediaType.APPLICATION_JSON)
            .body(errorResponse);
    }

    @ExceptionHandler(MissingRequestCookieException.class)
    public ResponseEntity<ErrorResponse> handleMissingRequestCookieException(MissingRequestCookieException e) {
        var errorResponse = ErrorResponse.from("필요한 쿠키가 누락되었습니다: " + e.getCookieName());
        log.atWarn().log(e.getClass() + ": " + e.getMessage());
        return ResponseEntity.badRequest()
            .contentType(org.springframework.http.MediaType.APPLICATION_JSON)
            .body(errorResponse);
    }

    @ExceptionHandler(JwtException.class)
    public ResponseEntity<ErrorResponse> handleJwtException(JwtException e) {
        var errorResponse = ErrorResponse.from("인증 토큰이 유효하지 않습니다.");
        log.atWarn().log("JWT Exception: " + e.getMessage());
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
            .contentType(org.springframework.http.MediaType.APPLICATION_JSON)
            .body(errorResponse);
    }

    @ExceptionHandler(UnauthorizedException.class)
    public ResponseEntity<ErrorResponse> handleUnauthorizedException(UnauthorizedException e) {
        var errorResponse = ErrorResponse.from("로그인이 필요합니다.");
        log.atWarn().log("Unauthorized: " + e.getMessage());
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
            .contentType(org.springframework.http.MediaType.APPLICATION_JSON)
            .body(errorResponse);
    }

    @ExceptionHandler(ForbiddenException.class)
    public ResponseEntity<ErrorResponse> handleForbiddenException(ForbiddenException e) {
        var errorResponse = ErrorResponse.from(e.getMessage());
        log.atWarn().log("Forbidden: " + e.getMessage());
        return ResponseEntity.status(HttpStatus.FORBIDDEN)
            .contentType(org.springframework.http.MediaType.APPLICATION_JSON)
            .body(errorResponse);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorResponse> handleException(Exception e) {
        var errorResponse = ErrorResponse.from(e.getMessage());
        log.atError()
            .setCause(e)
            .log("500 INTERNAL SERVER ERROR");
        return ResponseEntity.internalServerError()
            .contentType(org.springframework.http.MediaType.APPLICATION_JSON)
            .body(errorResponse);
    }

    // 정적 리소스를 찾지 못해서 발생하는 예외는, WARN 레벨로 로깅. (favicon 때문에 항상 뜸)
    @ExceptionHandler(NoResourceFoundException.class)
    public ResponseEntity<ErrorResponse> handleNoResourceFoundException(NoResourceFoundException e) {
        log.atWarn().log(e.getClass() + ": " + e.getMessage());
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
