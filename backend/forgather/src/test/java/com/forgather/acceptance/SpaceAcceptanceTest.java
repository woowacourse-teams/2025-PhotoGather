package com.forgather.acceptance;

import static org.assertj.core.api.Assertions.assertThat;

import java.time.LocalDateTime;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.test.web.servlet.MockMvc;

import com.forgather.domain.space.dto.CreateSpaceRequest;

import io.restassured.http.ContentType;
import io.restassured.module.mockmvc.RestAssuredMockMvc;

@DisplayName("인수 테스트: Space")
@AutoConfigureMockMvc
class SpaceAcceptanceTest extends AcceptanceTest {

    @Autowired
    private MockMvc mockMvc;

    @BeforeEach
    void setUp() {
        RestAssuredMockMvc.mockMvc(mockMvc);
    }

    @Test
    @DisplayName("RestAssuredMockMvc를 사용하여 Space를 생성한다.")
    void createSpaceWithRestAssuredMockMvc() {
        // given
        var request = new CreateSpaceRequest("test-space", LocalDateTime.now().plusDays(3), "1234");

        // when
        var response = RestAssuredMockMvc.given()
            .contentType(ContentType.JSON)
            .body(request)
            .when()
            .post("/spaces")
            .then()
            .extract();

        // then
        assertThat(response.statusCode()).isEqualTo(201);
        assertThat(response.body().jsonPath().getString("spaceCode")).isNotNull();
    }
}
