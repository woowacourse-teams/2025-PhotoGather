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

import com.forgather.back_office.dto.AdminSpaceResponse;
import com.forgather.back_office.dto.SpaceDetailResponse;
import com.forgather.back_office.model.AdminUser;
import com.forgather.back_office.repository.AdminUserRepository;
import com.forgather.domain.guestbook.model.Guest;
import com.forgather.domain.guestbook.repository.GuestBookCardRepository;
import com.forgather.domain.guestbook.repository.GuestRepository;
import com.forgather.domain.product.repository.ProductRepository;
import com.forgather.domain.space.model.Space;
import com.forgather.domain.space.repository.HostRepository;
import com.forgather.domain.space.repository.SpaceRepository;
import com.forgather.fixture.AdminUserFixture;
import com.forgather.fixture.GuestBookCardFixture;
import com.forgather.fixture.GuestFixture;
import com.forgather.fixture.HostFixture;
import com.forgather.fixture.ProductFixture;
import com.forgather.fixture.SpaceFixture;
import com.forgather.global.auth.model.Host;
import com.forgather.global.auth.model.SpaceHostMap;
import com.forgather.global.auth.repository.SpaceHostMapRepository;
import com.forgather.global.auth.util.JwtTokenProvider;

import io.restassured.module.mockmvc.RestAssuredMockMvc;

@AutoConfigureMockMvc
class AdminSpaceAcceptanceTest extends AcceptanceTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private AdminUserRepository adminUserRepository;

    @Autowired
    private SpaceRepository spaceRepository;

    @Autowired
    private HostRepository hostRepository;

    @Autowired
    private SpaceHostMapRepository spaceHostMapRepository;

    @Autowired
    private GuestRepository guestRepository;

    @Autowired
    private GuestBookCardRepository guestBookCardRepository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private JwtTokenProvider jwtTokenProvider;

    private AdminUser adminUser;
    private String accessToken;
    private Host host;

    @BeforeEach
    void setUp() {
        host = hostRepository.save(HostFixture.createHost());

        adminUser = adminUserRepository.save(AdminUserFixture.createAdminUser("어드민", "패스워드"));
        accessToken = jwtTokenProvider.generateAdminAccessToken(adminUser.getId());

        RestAssuredMockMvc.mockMvc(mockMvc);
    }

    @DisplayName("모든 스페이스를 조회한다.")
    @Test
    void getAllSpaces() {
        // given
        createSpaces(16);

        // when
        AdminSpaceResponse result = RestAssuredMockMvc.given()
            .headers("Authorization", "Bearer " + accessToken)
            .when()
            .get("/admin/spaces")
            .then()
            .statusCode(HttpStatus.OK.value())
            .extract()
            .body()
            .as(AdminSpaceResponse.class);

        // then
        assertAll(
            () -> assertThat(result.spaces()).hasSize(15),
            () -> assertThat(result.currentPage()).isEqualTo(1),
            () -> assertThat(result.pageSize()).isEqualTo(15),
            () -> assertThat(result.totalCount()).isEqualTo(16),
            () -> assertThat(result.totalPages()).isEqualTo(2)
        );
    }

    @DisplayName("어드민 유저가 아니면 모든 스페이스를 조회할 수 없다.")
    @Test
    void getAllSpacesWithNonAdminUser() {
        // given
        String hostAccessToken = jwtTokenProvider.generateAccessToken(host.getId());
        createSpaces(16);

        // when
        var result = RestAssuredMockMvc.given()
            .headers("Authorization", "Bearer " + hostAccessToken)
            .when()
            .get("/admin/spaces")
            .then()
            .extract();

        // then
        assertThat(result.statusCode()).isEqualTo(HttpStatus.FORBIDDEN.value());
    }

    @DisplayName("스페이스를 상세 조회한다.")
    @Test
    void getSpaceDetail() {
        // given
        Space space = spaceRepository.save(SpaceFixture.createSpaceWithCode("1234567890"));
        spaceHostMapRepository.save(new SpaceHostMap(space, host));
        productRepository.save(ProductFixture.createProductWithSpace(space));
        Guest guest1 = guestRepository.save(GuestFixture.createGuestWithNickname("1"));
        Guest guest2 = guestRepository.save(GuestFixture.createGuestWithNickname("2"));
        guestBookCardRepository.save(GuestBookCardFixture.createGuestBookCardWithSpaceAndGuest(space, guest1));
        guestBookCardRepository.save(GuestBookCardFixture.createGuestBookCardWithSpaceAndGuest(space, guest2));

        // when
        SpaceDetailResponse result = RestAssuredMockMvc.given()
            .headers("Authorization", "Bearer " + accessToken)
            .when()
            .get("/admin/spaces/{spaceCode}", space.getCode())
            .then()
            .statusCode(HttpStatus.OK.value())
            .extract()
            .body()
            .as(SpaceDetailResponse.class);

        // then
        assertAll(
            () -> assertThat(result.space().code()).isEqualTo(space.getCode()),
            () -> assertThat(result.hasProduct()).isTrue(),
            () -> assertThat(result.guestBookCount()).isEqualTo(2)
        );
    }

    @DisplayName("작품 소개를 등록하지 않은 스페이스를 상세 조회한다.")
    @Test
    void getSpaceDetailWithoutProduct() {
        // given
        Space space = spaceRepository.save(SpaceFixture.createSpaceWithCode("1234567890"));
        spaceHostMapRepository.save(new SpaceHostMap(space, host));
        Guest guest1 = guestRepository.save(GuestFixture.createGuestWithNickname("1"));
        Guest guest2 = guestRepository.save(GuestFixture.createGuestWithNickname("2"));
        guestBookCardRepository.save(GuestBookCardFixture.createGuestBookCardWithSpaceAndGuest(space, guest1));
        guestBookCardRepository.save(GuestBookCardFixture.createGuestBookCardWithSpaceAndGuest(space, guest2));

        // when
        SpaceDetailResponse result = RestAssuredMockMvc.given()
            .headers("Authorization", "Bearer " + accessToken)
            .when()
            .get("/admin/spaces/{spaceCode}", space.getCode())
            .then()
            .statusCode(HttpStatus.OK.value())
            .extract()
            .body()
            .as(SpaceDetailResponse.class);

        // then
        assertAll(
            () -> assertThat(result.space().code()).isEqualTo(space.getCode()),
            () -> assertThat(result.hasProduct()).isFalse(),
            () -> assertThat(result.guestBookCount()).isEqualTo(2)
        );
    }

    @DisplayName("작품 소개와 방명록이 없는 스페이스를 상세 조회한다.")
    @Test
    void getSpaceDetailWithoutProductAndGuestBookCard() {
        // given
        Space space = spaceRepository.save(SpaceFixture.createSpaceWithCode("1234567890"));
        spaceHostMapRepository.save(new SpaceHostMap(space, host));

        // when
        SpaceDetailResponse result = RestAssuredMockMvc.given()
            .headers("Authorization", "Bearer " + accessToken)
            .when()
            .get("/admin/spaces/{spaceCode}", space.getCode())
            .then()
            .statusCode(HttpStatus.OK.value())
            .extract()
            .body()
            .as(SpaceDetailResponse.class);

        // then
        assertAll(
            () -> assertThat(result.space().code()).isEqualTo(space.getCode()),
            () -> assertThat(result.hasProduct()).isFalse(),
            () -> assertThat(result.guestBookCount()).isZero()
        );
    }

    @DisplayName("어드민 유저가 아니면 모든 스페이스를 조회할 수 없다.")
    @Test
    void getSpaceDetailWithNonAdminUser() {
        // given
        String hostAccessToken = jwtTokenProvider.generateAccessToken(host.getId());
        Space space = spaceRepository.save(SpaceFixture.createSpaceWithCode("1234567890"));
        spaceHostMapRepository.save(new SpaceHostMap(space, host));

        // when
        var result = RestAssuredMockMvc.given()
            .headers("Authorization", "Bearer " + hostAccessToken)
            .when()
            .get("/admin/spaces/{spaceCode}", space.getCode())
            .then()
            .extract();

        // then
        assertThat(result.statusCode()).isEqualTo(HttpStatus.FORBIDDEN.value());
    }

    private void createSpaces(int count) {
        for (int i = 0; i < count; i++) {
            String spaceCode = String.valueOf(i);
            while (spaceCode.length() != 10) {
                spaceCode = spaceCode + "a";
            }
            Space space = spaceRepository.save(SpaceFixture.createSpaceWithCode(spaceCode));
            spaceHostMapRepository.save(new SpaceHostMap(space, host));
        }
    }
}
