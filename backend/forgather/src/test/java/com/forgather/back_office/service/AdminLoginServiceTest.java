package com.forgather.back_office.service;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.junit.jupiter.api.Assertions.assertAll;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.transaction.annotation.Transactional;

import com.forgather.container.TestOnContainer;
import com.forgather.back_office.dto.AdminLoginRequest;
import com.forgather.back_office.dto.AdminLoginResponse;
import com.forgather.back_office.repository.AdminUserRepository;
import com.forgather.fixture.AdminUserFixture;
import com.forgather.global.exception.BaseException;

@Transactional
@ActiveProfiles("test")
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.NONE)
class AdminLoginServiceTest extends TestOnContainer {

    @Autowired
    private AdminLoginService adminLoginService;

    @Autowired
    private AdminUserRepository adminUserRepository;

    @DisplayName("존재하는 어드민 유저가 로그인하면 성공한다.")
    @Test
    void adminLoginSuccess() {
        // given
        adminUserRepository.save(AdminUserFixture.createAdminUser("어드민", "패스워드"));
        AdminLoginRequest request = new AdminLoginRequest("어드민", "패스워드");

        // when
        AdminLoginResponse result = adminLoginService.login(request);

        // then
        assertAll(
            () -> assertThat(result.accessToken()).isNotBlank(),
            () -> assertThat(result.refreshToken()).isNotBlank()
        );
    }

    @DisplayName("존재하지 않는 어드민 유저가 로그인하면 실패한다.")
    @Test
    void adminLoginFailWithNonExists() {
        // given
        AdminLoginRequest request = new AdminLoginRequest("없는유저", "없는패스워드");

        // when & then
        assertThatThrownBy(() -> adminLoginService.login(request))
            .isInstanceOf(BaseException.class);
    }

    @DisplayName("패스워드가 일치하지 않으면 로그인에 실패한다.")
    @Test
    void adminLoginFailWithWrongPW() {
        // given
        adminUserRepository.save(AdminUserFixture.createAdminUser("어드민", "패스워드"));
        AdminLoginRequest request = new AdminLoginRequest("어드민", "틀린패스워드");

        // when & then
        assertThatThrownBy(() -> adminLoginService.login(request))
            .isInstanceOf(BaseException.class);
    }
}
