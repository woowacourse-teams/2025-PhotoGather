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

    /**
     * 예측 가능한 클라이언트발 예외 -> info
     */
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ErrorResponse> handleMethodArgumentNotValidException(MethodArgumentNotValidException e) {
        logClientInfo(e);
        return ResponseEntity.status(e.getStatusCode())
            .contentType(APPLICATION_JSON)
            .body(ErrorResponse.from(e.getMessage()));
    }

    @ExceptionHandler(HttpMediaTypeNotSupportedException.class)
    public ResponseEntity<ErrorResponse> handleHttpMediaTypeNotSupportedException(
        HttpMediaTypeNotSupportedException e
    ) {
        logClientInfo(e);
        return ResponseEntity.status(e.getStatusCode())
            .contentType(APPLICATION_JSON)
            .body(ErrorResponse.from(e.getMessage()));
    }

    @ExceptionHandler(HttpRequestMethodNotSupportedException.class)
    public ResponseEntity<ErrorResponse> handleHttpRequestMethodNotSupportedException(
        HttpRequestMethodNotSupportedException e
    ) {
        logClientInfo(e);
        return ResponseEntity.status(e.getStatusCode())
            .contentType(APPLICATION_JSON)
            .body(ErrorResponse.from(e.getMessage()));
    }

    @ExceptionHandler(NoResourceFoundException.class)
    public ResponseEntity<ErrorResponse> handleNoResourceFoundException(NoResourceFoundException e) {
        logClientInfo(e);
        var errorResponse = ErrorResponse.from(e.getMessage());
        return ResponseEntity.status(e.getStatusCode())
            .contentType(APPLICATION_JSON)
            .body(errorResponse);
    }

    @ExceptionHandler(MissingRequestCookieException.class)
    public ResponseEntity<ErrorResponse> handleMissingRequestCookieException(MissingRequestCookieException e) {
        logClientInfo(e);
        return ResponseEntity.status(e.getStatusCode())
            .contentType(APPLICATION_JSON)
            .body(ErrorResponse.from("필요한 쿠키가 누락되었습니다: " + e.getCookieName()));
    }

    @ExceptionHandler(NotFoundException.class)
    public ResponseEntity<ErrorResponse> handleNotFoundException(NotFoundException e) {
        logClientInfo(e);
        return ResponseEntity.status(e.getStatusCode())
            .contentType(APPLICATION_JSON)
            .body(ErrorResponse.from(e.getMessage()));
    }

    /**
     * 예측 가능하지만 주의해야할 예외 -> warn
     */
    @ExceptionHandler(MultipartException.class)
    public ResponseEntity<ErrorResponse> handleMultipartException(MultipartException e) {
        logClientWarning(e);
        return ResponseEntity.status(400)
            .contentType(APPLICATION_JSON)
            .body(ErrorResponse.from(e.getMessage()));
    }

    @ExceptionHandler(MaxUploadSizeExceededException.class)
    public ResponseEntity<ErrorResponse> handleMaxUploadSizeExceededException(MaxUploadSizeExceededException e) {
        logClientWarning(e);
        return ResponseEntity.status(e.getStatusCode())
            .contentType(APPLICATION_JSON)
            .body(ErrorResponse.from(e.getMessage()));
    }

    @ExceptionHandler(JwtException.class)
    public ResponseEntity<ErrorResponse> handleJwtException(JwtException e) {
        logClientWarning(e);
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
            .contentType(APPLICATION_JSON)
            .body(ErrorResponse.from("인증에 실패했습니다."));
    }

    @ExceptionHandler(ForbiddenException.class)
    public ResponseEntity<ErrorResponse> handleForbiddenException(ForbiddenException e) {
        logClientWarning(e);
        return ResponseEntity.status(HttpStatus.FORBIDDEN)
            .contentType(APPLICATION_JSON)
            .body(ErrorResponse.from("접근 권한이 없습니다."));
    }

    @ExceptionHandler(UnauthorizedException.class)
    public ResponseEntity<ErrorResponse> handleUnauthorizedException(UnauthorizedException e) {
        logClientWarning(e);
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
            .contentType(APPLICATION_JSON)
            .body(ErrorResponse.from("인증 토큰이 유효하지 않습니다."));
    }

    /**
     * 핸들링 되지 않은 커스텀 비즈니스 예외
     * 4XX -> info
     * 5XX -> error
     */
    @ExceptionHandler(BaseException.class)
    public ResponseEntity<ErrorResponse> handleBaseException(BaseException e) {
        if (e.isSecurityError()) {
            logClientWarning(e);
        } else if (e.isClientError()) {
            logClientInfo(e);
        } else {
            logServerError(e);
        }

        return ResponseEntity.status(e.getStatusCode())
            .contentType(APPLICATION_JSON)
            .body(ErrorResponse.from(e.getMessage()));
    }

    private void logClientInfo(Exception e) {
        log.atInfo().log("{}: {}", e.getClass().getSimpleName(), e.getMessage());
    }

    private void logClientWarning(Exception e) {
        log.atWarn().log("{}: {}", e.getClass().getSimpleName(), e.getMessage());
    }

    /**
     * 핸들링 되지 않은 모든 예외 -> error
     */
    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorResponse> handleException(Exception e) {
        logServerError(e);
        return ResponseEntity.internalServerError()
            .contentType(APPLICATION_JSON)
            .body(ErrorResponse.from(e.getMessage()));
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
