package com.forgather.global.auth.client.scheduler;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import com.forgather.global.auth.service.AuthService;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class RefreshTokenRemoveScheduler {

    private final AuthService authService;

    @Scheduled(cron = "0 0 0 * * *") // 매일 자정에 실행
    public void removeExpiredRefreshTokens() {
        authService.removeExpiredRefreshTokens();
    }
}
