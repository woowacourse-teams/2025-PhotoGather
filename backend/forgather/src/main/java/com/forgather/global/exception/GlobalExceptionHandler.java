package com.forgather.global.exception;

import static org.springframework.http.MediaType.APPLICATION_JSON;

import java.util.List;

import org.springframework.dao.InvalidDataAccessApiUsageException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.web.HttpMediaTypeNotSupportedException;
import org.springframework.web.HttpRequestMethodNotSupportedException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.MissingRequestCookieException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.multipart.MultipartException;
import org.springframework.web.servlet.resource.NoResourceFoundException;

import io.jsonwebtoken.JwtException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestControllerAdvice
@RequiredArgsConstructor
public class GlobalExceptionHandler {

    private static final List<Class<? extends Exception>> BAD_REQUEST_EXCEPTIONS = List.of(
        MethodArgumentNotValidException.class,
        HttpMediaTypeNotSupportedException.class,
        MultipartException.class,
        HttpRequestMethodNotSupportedException.class,
        HttpMessageNotReadableException.class, // 서버 에러일 수도, 아닐 수도
        InvalidDataAccessApiUsageException.class, // 명백히 서버 에러(다만 현재 interface default method)
        IllegalArgumentException.class, // 자식 에외 확인해보면 서버 에러가 수두룩
        IllegalStateException.class // 자식 에외 확인해보면 서버 에러가 수두룩
    );

    @ExceptionHandler(MissingRequestCookieException.class)
    public ResponseEntity<ErrorResponse> handleMissingRequestCookieException(MissingRequestCookieException e) {
        log.atWarn().log(e.getClass() + ": " + e.getMessage());
        var errorResponse = ErrorResponse.from("필요한 쿠키가 누락되었습니다: " + e.getCookieName());
        return ResponseEntity.badRequest()
            .contentType(APPLICATION_JSON)
            .body(errorResponse);
    }

    @ExceptionHandler(JwtException.class)
    public ResponseEntity<ErrorResponse> handleJwtException(JwtException e) {
        log.atWarn().log("JWT Exception: " + e.getMessage());
        var errorResponse = ErrorResponse.from("인증 토큰이 유효하지 않습니다.");
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
            .contentType(APPLICATION_JSON)
            .body(errorResponse);
    }

    @ExceptionHandler(UnauthorizedException.class)
    public ResponseEntity<ErrorResponse> handleUnauthorizedException(UnauthorizedException e) {
        log.atWarn().log("Unauthorized: " + e.getMessage());
        var errorResponse = ErrorResponse.from("로그인이 필요합니다.");
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
            .contentType(APPLICATION_JSON)
            .body(errorResponse);
    }

    @ExceptionHandler(ForbiddenException.class)
    public ResponseEntity<ErrorResponse> handleForbiddenException(ForbiddenException e) {
        log.atWarn().log("Forbidden: " + e.getMessage());
        var errorResponse = ErrorResponse.from(e.getMessage());
        return ResponseEntity.status(HttpStatus.FORBIDDEN)
            .contentType(APPLICATION_JSON)
            .body(errorResponse);
    }

    @ExceptionHandler(NoResourceFoundException.class)
    public ResponseEntity<ErrorResponse> handleNoResourceFoundException(NoResourceFoundException e) {
        log.atWarn().log(e.getClass() + ": " + e.getMessage());
        return ResponseEntity.notFound().build();
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorResponse> handleException(Exception e) {
        if (BAD_REQUEST_EXCEPTIONS.contains(e.getClass())) {
            return handleExceptionToBadRequest(e);
        }
        return handleExceptionToInternalServerError(e);
    }

    private ResponseEntity<ErrorResponse> handleExceptionToBadRequest(Exception e) {
        log.atWarn().log(e.getClass() + ": " + e.getMessage());
        var errorResponse = ErrorResponse.from(e.getMessage());
        return ResponseEntity.badRequest()
            .contentType(APPLICATION_JSON)
            .body(errorResponse);
    }

    private ResponseEntity<ErrorResponse> handleExceptionToInternalServerError(Exception e) {
        log.atError().setCause(e).log("500 INTERNAL SERVER ERROR");
        var errorResponse = ErrorResponse.from(e.getMessage());
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
