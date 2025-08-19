package com.forgather.global.auth.scheduler;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import com.forgather.global.auth.client.KakaoAuthClient;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class KakaoPublicKeyScheduler {

    private final KakaoAuthClient kakaoAuthClient;

    @Scheduled(cron = "0 0 3 * * *") // 매일 새벽 3시 실행
    public void updateKakaoPublicKeys() {
        kakaoAuthClient.updateKakaoKeys();
    }
}
