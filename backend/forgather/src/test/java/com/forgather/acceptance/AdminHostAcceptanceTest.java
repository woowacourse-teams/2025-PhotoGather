package com.forgather.acceptance;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertAll;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.http.HttpStatus;
import org.springframework.test.web.servlet.MockMvc;

import com.forgather.back_office.dto.AdminHostResponse;
import com.forgather.back_office.model.AdminUser;
import com.forgather.back_office.repository.AdminUserRepository;
import com.forgather.domain.space.repository.HostRepository;
import com.forgather.fixture.AdminUserFixture;
import com.forgather.fixture.HostFixture;
import com.forgather.global.auth.model.Host;
import com.forgather.global.auth.util.JwtTokenProvider;

import io.restassured.module.mockmvc.RestAssuredMockMvc;

@AutoConfigureMockMvc
class AdminHostAcceptanceTest extends AcceptanceTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private AdminUserRepository adminUserRepository;

    @Autowired
    private HostRepository hostRepository;

    @Autowired
    private JwtTokenProvider jwtTokenProvider;

    private AdminUser adminUser;
    private String accessToken;

    @BeforeEach
    void setUp() {
        adminUser = adminUserRepository.save(AdminUserFixture.createAdminUser("어드민", "패스워드"));
        accessToken = jwtTokenProvider.generateAdminAccessToken(adminUser.getId());

        RestAssuredMockMvc.mockMvc(mockMvc);
    }

    @DisplayName("모든 호스트 정보를 조회한다.")
    @Test
    void getAllHosts() {
        // given
        createHost(16);

        // when
        AdminHostResponse result = RestAssuredMockMvc.given()
            .headers("Authorization", "Bearer " + accessToken)
            .when()
            .get("/admin/hosts")
            .then()
            .statusCode(HttpStatus.OK.value())
            .extract()
            .body()
            .as(AdminHostResponse.class);

        // then
        assertAll(
            () -> assertThat(result.hosts()).hasSize(15),
            () -> assertThat(result.currentPage()).isEqualTo(1),
            () -> assertThat(result.pageSize()).isEqualTo(15),
            () -> assertThat(result.totalCount()).isEqualTo(16),
            () -> assertThat(result.totalPages()).isEqualTo(2)
        );
    }

    @DisplayName("어드민 유저가 아니면 모든 호스트 정보를 조회할 수 없다.")
    @Test
    void getAllHostsWithNonAdminUser() {
        // given
        Host host = hostRepository.save(HostFixture.createHost());
        String hostAccessToken = jwtTokenProvider.generateAccessToken(host.getId());

        // when
        var result = RestAssuredMockMvc.given()
            .headers("Authorization", "Bearer " + hostAccessToken)
            .when()
            .get("/admin/hosts")
            .then()
            .extract();

        // then
        assertThat(result.statusCode()).isEqualTo(HttpStatus.FORBIDDEN.value());
    }

    private void createHost(int count) {
        for (int i = 0; i < count; i++) {
            hostRepository.save(HostFixture.createHost());
        }
    }
}
