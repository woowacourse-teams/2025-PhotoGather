package com.forgather.domain.stats.dto;

public record LandingStatsResponse(LandingSpaceStats spaceStats, LandingGuestBookStats guestBookStats) {

    public LandingStatsResponse(long spaceCount, long guestBookCardCount) {
        this(
            new LandingSpaceStats(spaceCount),
            new LandingGuestBookStats(guestBookCardCount)
        );
    }

    public record LandingSpaceStats(long spaceCount) {
    }

    public record LandingGuestBookStats(long cardCount) {
    }
}
