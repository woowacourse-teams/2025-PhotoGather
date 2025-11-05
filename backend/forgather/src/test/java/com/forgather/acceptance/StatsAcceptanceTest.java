package com.forgather.acceptance;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertAll;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.test.web.servlet.MockMvc;

import com.forgather.domain.guestbook.model.Guest;
import com.forgather.domain.guestbook.repository.GuestBookCardRepository;
import com.forgather.domain.guestbook.repository.GuestRepository;
import com.forgather.domain.space.model.Space;
import com.forgather.domain.space.repository.SpaceRepository;
import com.forgather.domain.stats.dto.LandingStatsResponse;
import com.forgather.fixture.GuestBookCardFixture;
import com.forgather.fixture.GuestFixture;
import com.forgather.fixture.SpaceFixture;

import io.restassured.http.ContentType;
import io.restassured.module.mockmvc.RestAssuredMockMvc;

@AutoConfigureMockMvc
public class StatsAcceptanceTest extends AcceptanceTest{

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private SpaceRepository spaceRepository;

    @Autowired
    private GuestBookCardRepository guestBookCardRepository;

    @Autowired
    private GuestRepository guestRepository;

    private Guest guest;

    @BeforeEach
    public void setup() {
        guest = guestRepository.save(GuestFixture.createGuest());

        RestAssuredMockMvc.mockMvc(mockMvc);
    }

    @DisplayName("랜딩 페이지용 통계로 스페이스와 방명록 카드의 총 개수를 조회한다")
    @Test
    public void landing() {
        // given
        Space space1 = spaceRepository.save(SpaceFixture.createSpace());
        Space space2 = spaceRepository.save(SpaceFixture.createSpace());
        guestBookCardRepository.save(GuestBookCardFixture.createGuestBookCardWithSpaceAndGuest(space1, guest));
        guestBookCardRepository.save(GuestBookCardFixture.createGuestBookCardWithSpaceAndGuest(space1, guest));
        guestBookCardRepository.save(GuestBookCardFixture.createGuestBookCardWithSpaceAndGuest(space2, guest));
        guestBookCardRepository.save(GuestBookCardFixture.createGuestBookCardWithSpaceAndGuest(space2, guest));
        guestBookCardRepository.save(GuestBookCardFixture.createGuestBookCardWithSpaceAndGuest(space2, guest));

        // when
        LandingStatsResponse result = RestAssuredMockMvc.given()
            .accept(ContentType.JSON)
            .when()
            .get("/stats/landing")
            .then()
            .statusCode(200)
            .extract()
            .body()
            .as(LandingStatsResponse.class);

        // then
        assertAll(
            () -> assertThat(result.spaceStats().spaceCount()).isEqualTo(2),
            () -> assertThat(result.guestBookStats().cardCount()).isEqualTo(5)
        );
    }
}
