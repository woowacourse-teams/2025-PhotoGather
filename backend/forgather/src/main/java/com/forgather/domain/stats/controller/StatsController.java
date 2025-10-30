package com.forgather.domain.stats.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.forgather.domain.stats.dto.LandingStatsResponse;
import com.forgather.domain.stats.service.StatsService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Tag(name = "Stats: 통계", description = "서비스 이용 통계 API")
@Slf4j
@RequiredArgsConstructor
@RequestMapping("/stats")
@RestController
public class StatsController {

    private final StatsService statsService;

    @Operation(summary = "랜딩 페이지용 통계", description = "서비스 내 모든 스페이스와 방명록 카드의 개수를 반환합니다.")
    @GetMapping("/landing")
    public ResponseEntity<LandingStatsResponse> landing() {
        LandingStatsResponse response = statsService.landing();
        return ResponseEntity.ok(response);
    }
}
