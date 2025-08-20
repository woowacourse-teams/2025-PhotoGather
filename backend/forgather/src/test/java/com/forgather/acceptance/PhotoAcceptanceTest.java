package com.forgather.acceptance;

import static org.assertj.core.api.SoftAssertions.assertSoftly;

import java.time.LocalDateTime;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

import com.forgather.domain.space.model.Photo;
import com.forgather.domain.space.model.PhotoMetaData;
import com.forgather.domain.space.model.Space;
import com.forgather.domain.space.repository.PhotoRepository;
import com.forgather.domain.space.repository.SpaceRepository;

import io.restassured.module.mockmvc.RestAssuredMockMvc;

@DisplayName("인수 테스트: Photo")
@AutoConfigureMockMvc
class PhotoAcceptanceTest extends AcceptanceTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private SpaceRepository spaceRepository;

    @Autowired
    private PhotoRepository photoRepository;

    @BeforeEach
    void setUp() {
        RestAssuredMockMvc.mockMvc(mockMvc);
    }

    @Test
    @Transactional
    @DisplayName("스페이스 호스트가 사진을 조회한다.")
    void getPhoto() {
        // given
        var space = spaceRepository.save(new Space("space-code", "1234", "test-space", 3, LocalDateTime.now()));
        var photo = photoRepository.save(new Photo(space, "path", new PhotoMetaData(LocalDateTime.now()), 1024L));

        // when
        var response = RestAssuredMockMvc.given()
            .when()
            .get("/spaces/{spaceCode}/photos/{photoId}", space.getCode(), photo.getId())
            .then()
            .extract();

        // then
        assertSoftly(softly -> {
            softly.assertThat(response.statusCode()).isEqualTo(200);
            softly.assertThat(response.body().jsonPath().getString("id")).isEqualTo(photo.getId().toString());
        });
    }
}
