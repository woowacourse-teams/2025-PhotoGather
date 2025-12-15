package com.forgather.back_office.service;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertAll;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.transaction.annotation.Transactional;

import com.forgather.container.TestOnContainer;
import com.forgather.back_office.dto.AdminHostResponse;
import com.forgather.back_office.model.AdminUser;
import com.forgather.back_office.repository.AdminUserRepository;
import com.forgather.domain.space.model.Space;
import com.forgather.domain.space.repository.HostRepository;
import com.forgather.domain.space.repository.SpaceRepository;
import com.forgather.fixture.AdminUserFixture;
import com.forgather.fixture.HostFixture;
import com.forgather.fixture.SpaceFixture;
import com.forgather.global.auth.model.Host;
import com.forgather.global.auth.model.SpaceHostMap;
import com.forgather.global.auth.repository.SpaceHostMapRepository;

@Transactional
@ActiveProfiles("test")
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.NONE)
class AdminHostServiceTest extends TestOnContainer {

    @Autowired
    private AdminHostService adminHostService;

    @Autowired
    private AdminUserRepository adminUserRepository;

    @Autowired
    private HostRepository hostRepository;

    @Autowired
    private SpaceRepository spaceRepository;

    @Autowired
    private SpaceHostMapRepository spaceHostMapRepository;

    @DisplayName("전체 호스트 목록을 조회한다.")
    @Test
    void getAllHosts() {
        // given
        AdminUser adminUser = adminUserRepository.save(AdminUserFixture.createAdminUser());
        Host host1 = hostRepository.save(HostFixture.createHost());
        Host host2 = hostRepository.save(HostFixture.createHost());
        Space space1 = spaceRepository.save(SpaceFixture.createSpaceWithCode("1111111111"));
        Space space2 = spaceRepository.save(SpaceFixture.createSpaceWithCode("2222222222"));
        spaceHostMapRepository.save(new SpaceHostMap(space1, host1));
        spaceHostMapRepository.save(new SpaceHostMap(space2, host1));
        Pageable pageable = PageRequest.of(0, 10);

        // when
        AdminHostResponse result = adminHostService.getAllHosts(pageable, adminUser);

        // then
        assertAll(
            () -> assertThat(result.hosts()).hasSize(2),
            () -> assertThat(result.currentPage()).isEqualTo(1),
            () -> assertThat(result.pageSize()).isEqualTo(10),
            () -> assertThat(result.totalCount()).isEqualTo(2),
            () -> assertThat(result.totalPages()).isEqualTo(1),
            () -> assertThat(result.hosts().get(0).spaceIds()).hasSize(2),
            () -> assertThat(result.hosts().get(1).spaceIds()).hasSize(0)
        );
    }
}
