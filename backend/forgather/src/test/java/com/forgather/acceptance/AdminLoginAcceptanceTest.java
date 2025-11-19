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

import com.forgather.back_office.dto.AdminLoginRequest;
import com.forgather.back_office.dto.AdminLoginResponse;
import com.forgather.back_office.model.AdminUser;
import com.forgather.back_office.repository.AdminUserRepository;
import com.forgather.global.auth.util.JwtTokenProvider;

import io.restassured.module.mockmvc.RestAssuredMockMvc;

@AutoConfigureMockMvc
class AdminLoginAcceptanceTest extends AcceptanceTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private AdminUserRepository adminUserRepository;

    @Autowired
    private JwtTokenProvider jwtTokenProvider;

    @BeforeEach
    void setUp() {
        RestAssuredMockMvc.mockMvc(mockMvc);
    }

    @DisplayName("백오피스 어드민 로그인을 한다.")
    @Test
    void loginBackOffice() {
        // given
        adminUserRepository.save(new AdminUser("admin", "admin"));
        AdminLoginRequest request = new AdminLoginRequest("admin", "admin");

        // when
        AdminLoginResponse result = RestAssuredMockMvc.given()
            .body(request)
            .when()
            .post("/admin/login")
            .then()
            .statusCode(HttpStatus.OK.value())
            .extract()
            .body()
            .as(AdminLoginResponse.class);

        // then
        assertAll(
            () -> assertThat(result.accessToken()).isNotBlank(),
            () -> assertThat(result.refreshToken()).isNotBlank(),
            () -> assertThat(jwtTokenProvider.validateToken(result.accessToken())).isTrue(),
            () -> assertThat(jwtTokenProvider.validateToken(result.refreshToken())).isTrue()
        );
    }
}
