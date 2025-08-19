package com.forgather.global.auth.scheduler;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import com.forgather.global.auth.service.AuthService;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class RefreshTokenRemoveScheduler {

    private final AuthService authService;

    @Scheduled(cron = "0 0 3 * * *") // 매일 새벽 3시 실행
    public void removeExpiredRefreshTokens() {
        authService.removeExpiredRefreshTokens();
    }
}
