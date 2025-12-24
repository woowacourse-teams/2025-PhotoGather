package com.forgather.domain.space.service;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatException;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.junit.jupiter.api.Assertions.assertAll;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.forgather.domain.space.dto.CreateSpaceRequest;
import com.forgather.domain.space.dto.HostSpaceResponse;
import com.forgather.domain.space.model.Space;
import com.forgather.domain.space.repository.HostRepository;
import com.forgather.domain.space.repository.SpaceRepository;
import com.forgather.fixture.HostFixture;
import com.forgather.fixture.SpaceFixture;
import com.forgather.fixture.SpaceHostMapFixture;
import com.forgather.global.auth.model.Host;
import com.forgather.global.auth.repository.SpaceHostMapRepository;
import com.forgather.global.exception.NotFoundException;
import com.forgather.container.TestOnContainer;

@ActiveProfiles("test")
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@Transactional
class SpaceServiceTest extends TestOnContainer {

    private final SpaceService spaceService;
    private final SpaceRepository spaceRepository;
    private final HostRepository hostRepository;
    private final SpaceHostMapRepository spaceHostMapRepository;

    @Autowired
    public SpaceServiceTest(SpaceService spaceService, SpaceRepository spaceRepository, HostRepository hostRepository,
        SpaceHostMapRepository spaceHostMapRepository
    ) {
        this.spaceService = spaceService;
        this.spaceRepository = spaceRepository;
        this.hostRepository = hostRepository;
        this.spaceHostMapRepository = spaceHostMapRepository;
    }

    @DisplayName("스페이스 생성 시, 검증에 실패하면 스페이스가 DB에 저장되지 않는다.")
    @Test
    void createSpaceWithInvalidName() {
        // given
        Host host = hostRepository.save(HostFixture.createHost());
        String invalidSpaceName = " "; // 스페이스 이름이 공백인 경우
        CreateSpaceRequest request = new CreateSpaceRequest(
            invalidSpaceName,
            "description",
            true,
            "forgather_official",
            "forgather@forgather.me"
        );
        MultipartFile file = new MockMultipartFile("temp.png", new byte[] {});

        // when & then
        assertAll(
            () -> assertThatException().isThrownBy(() -> spaceService.create(request, file, host)),
            () -> assertThat(spaceRepository.findAllByDeletedAtIsNull()).isEmpty()
        );
    }

    @DisplayName("호스트의 스페이스 목록 조회 시 논리 삭제된 스페이스는 조회하지 않는다")
    @Test
    void doesNotReturnSoftDeletedSpaceWhenQueryHostSpaces() {
        // given
        Host host = hostRepository.save(HostFixture.createHost());
        Space space1 = spaceRepository.save(SpaceFixture.createSpaceWithCode("abcdefghij"));
        Space space2 = spaceRepository.save(SpaceFixture.createSpaceWithCode("1234567890"));
        spaceHostMapRepository.save(SpaceHostMapFixture.createSpaceHostMapWithSpaceAndHost(space1, host));
        spaceHostMapRepository.save(SpaceHostMapFixture.createSpaceHostMapWithSpaceAndHost(space2, host));
        spaceService.delete(space1.getCode(), host);

        // when
        HostSpaceResponse result = spaceService.getSpacesInformation(host);

        // then
        assertThat(result.spaces().getFirst().spaceCode()).isEqualTo(space2.getCode());
    }

    @DisplayName("논리 삭제된 스페이스를 조회하면 예외를 던진다")
    @Test
    void shouldThrowExceptionWhenQuerySoftDeletedSpace() {
        // given
        Host host = hostRepository.save(HostFixture.createHost());
        Space space = spaceRepository.save(SpaceFixture.createSpaceWithCode("abcdefghij"));
        spaceHostMapRepository.save(SpaceHostMapFixture.createSpaceHostMapWithSpaceAndHost(space, host));
        spaceService.delete(space.getCode(), host);

        // when & then
        assertThatThrownBy(() -> spaceService.getSpaceInformation(space.getCode()))
            .isInstanceOf(NotFoundException.class)
            .hasMessageContaining("존재하지 않는 스페이스입니다.");
    }
}
