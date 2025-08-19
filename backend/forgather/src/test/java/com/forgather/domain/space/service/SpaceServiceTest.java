package com.forgather.domain.space.service;

import static org.assertj.core.api.Assertions.assertThatException;

import java.time.LocalDateTime;

import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.TestPropertySource;

import com.forgather.domain.space.dto.CreateSpaceRequest;
import com.forgather.domain.space.repository.HostRepository;
import com.forgather.domain.space.repository.SpaceRepository;
import com.forgather.global.auth.model.Host;

@ActiveProfiles("test")
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@TestPropertySource(properties = "spring.aop.auto=false")
class SpaceServiceTest {

    private final SpaceService spaceService;
    private final SpaceRepository spaceRepository;
    private final HostRepository hostRepository;

    @Autowired
    public SpaceServiceTest(SpaceService spaceService, SpaceRepository spaceRepository, HostRepository hostRepository) {
        this.spaceService = spaceService;
        this.spaceRepository = spaceRepository;
        this.hostRepository = hostRepository;
    }

    @DisplayName("스페이스 생성 시, 검증에 실패하면 스페이스가 DB에 저장되지 않는다.")
    @Test
    void createSpaceWithInvalidName() {
        // given
        String invalidSpaceName = " "; // 스페이스 이름이 공백인 경우
        CreateSpaceRequest request = new CreateSpaceRequest(
            invalidSpaceName,
            48,
            LocalDateTime.now().plusDays(1)
        );
        Host host = hostRepository.save(new Host("testHost", "testPictureUrl"));

        assertThatException().isThrownBy(
            () -> spaceService.create(request, host)
        );

        Assertions.assertThat(spaceRepository.findAll()).isEmpty();
    }
}
