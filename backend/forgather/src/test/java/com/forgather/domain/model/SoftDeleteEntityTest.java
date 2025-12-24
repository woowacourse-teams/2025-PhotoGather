package com.forgather.domain.model;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.params.provider.Arguments.arguments;

import java.util.stream.Stream;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.Arguments;
import org.junit.jupiter.params.provider.MethodSource;

import com.forgather.fixture.GuestBookCardFixture;
import com.forgather.fixture.GuestBookCardPhotoFixture;
import com.forgather.fixture.GuestFixture;
import com.forgather.fixture.ProductFixture;
import com.forgather.fixture.ProductPhotoFixture;
import com.forgather.fixture.SpaceFixture;
import com.forgather.fixture.SpaceHostMapFixture;
import com.forgather.fixture.SpacePhotoFixture;

class SoftDeleteEntityTest {

    @DisplayName("논리 삭제되지 않은 엔티티의 deletedAt은 null이다")
    @MethodSource("softDeleteEntities")
    @ParameterizedTest
    void deletedAtIsNullWhenNotSoftDeleted(SoftDeleteEntity entity) {
        // then
        assertThat(entity.getDeletedAt()).isNull();
    }

    @DisplayName("논리 삭제된 엔티티의 deletedAt은 null이 아니다")
    @MethodSource("softDeleteEntities")
    @ParameterizedTest
    void deletedAtIsNotNullWhenSoftDeleted(SoftDeleteEntity entity) {
        // when
        entity.delete();

        // then
        assertThat(entity.getDeletedAt()).isNotNull();
    }

    static Stream<Arguments> softDeleteEntities() {
        return Stream.of(
            arguments(SpaceFixture.createSpace()),
            arguments(SpacePhotoFixture.createSpacePhoto()),
            arguments(SpaceHostMapFixture.createSpaceHostMap()),
            arguments(GuestBookCardFixture.createGuestBookCard()),
            arguments(GuestBookCardPhotoFixture.createGuestBookCardPhoto()),
            arguments(GuestFixture.createGuest()),
            arguments(ProductFixture.createProduct()),
            arguments(ProductPhotoFixture.createProductPhoto())
        );
    }
}
