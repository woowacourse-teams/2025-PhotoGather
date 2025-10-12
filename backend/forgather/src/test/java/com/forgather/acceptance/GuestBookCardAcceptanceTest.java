package com.forgather.acceptance;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertAll;

import java.util.List;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;

import com.forgather.domain.guestbook.dto.WriteGuestBookCardPhotoRequest;
import com.forgather.domain.guestbook.dto.WriteGuestBookCardRequest;
import com.forgather.domain.guestbook.dto.WriteGuestBookCardResponse;
import com.forgather.domain.space.model.Space;
import com.forgather.domain.space.repository.SpaceRepository;
import com.forgather.domain.upload.AwsS3Cloud;
import com.forgather.fixture.SpaceFixture;

import io.restassured.http.ContentType;
import io.restassured.module.mockmvc.RestAssuredMockMvc;

@AutoConfigureMockMvc
public class GuestBookCardAcceptanceTest extends AcceptanceTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private SpaceRepository spaceRepository;

    @MockitoBean
    private AwsS3Cloud awsS3Cloud;

    private Space space;
    private WriteGuestBookCardRequest writeRequest = new WriteGuestBookCardRequest(
        "nickname",
            "message",
        List.of(
            new WriteGuestBookCardPhotoRequest("photo1.jpg", "abc.jpg", 1024L),
            new WriteGuestBookCardPhotoRequest("photo2.jpg", "def.jpg", 2048L),
            new WriteGuestBookCardPhotoRequest("photo3.jpg", "ghi.jpg", 4096L)
        )
    );

    @BeforeEach
    void setUp() {
        space = SpaceFixture.createSpace();
        spaceRepository.save(space);
        RestAssuredMockMvc.mockMvc(mockMvc);
    }

    @DisplayName("방명록 카드 작성")
    @Test
    void write() {
        // when
        WriteGuestBookCardResponse response = RestAssuredMockMvc.given()
            .body(writeRequest)
            .contentType(ContentType.JSON)
            .accept(ContentType.JSON)
            .when()
            .post("/spaces/%s/guestbook".formatted(space.getCode()))
            .then()
            .statusCode(201)
            .extract()
            .body()
            .as(WriteGuestBookCardResponse.class);

        // then
        assertAll(
            () -> assertThat(response.id()).isNotNull(),
            () -> assertThat(response.nickname()).isEqualTo(writeRequest.nickname()),
            () -> assertThat(response.message()).isEqualTo(writeRequest.message()),

            () -> assertThat(response.photos().get(0).originalName()).isEqualTo("photo1.jpg"),
            () -> assertThat(response.photos().get(0).path()).isEqualTo("null/spaces/1234567890/guestbook/abc.jpg"),

            () -> assertThat(response.photos().get(1).originalName()).isEqualTo("photo2.jpg"),
            () -> assertThat(response.photos().get(1).path()).isEqualTo("null/spaces/1234567890/guestbook/def.jpg"),

            () -> assertThat(response.photos().get(2).originalName()).isEqualTo("photo3.jpg"),
            () -> assertThat(response.photos().get(2).path()).isEqualTo("null/spaces/1234567890/guestbook/ghi.jpg")
        );
    }
}
