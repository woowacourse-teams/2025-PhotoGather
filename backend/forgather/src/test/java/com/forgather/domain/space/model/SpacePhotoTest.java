package com.forgather.domain.space.model;

import static org.assertj.core.api.Assertions.assertThat;

import java.util.stream.Stream;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.Arguments;
import org.junit.jupiter.params.provider.MethodSource;

import com.forgather.fixture.SpacePhotoFixture;

class SpacePhotoTest {

    @DisplayName("스페이스 사진의 경로가 존재하는지 확인한다.")
    @MethodSource
    @ParameterizedTest
    void spacePhotoExistence(SpacePhoto spacePhoto, boolean expected) {
        // when & then
        assertThat(spacePhoto.isExists()).isEqualTo(expected);
    }

    private static Stream<Arguments> spacePhotoExistence() {
        return Stream.of(
            Arguments.of(SpacePhotoFixture.createSpacePhoto(), true),
            Arguments.of(SpacePhotoFixture.createEmptySpacePhoto(), false)
        );
    }
}
