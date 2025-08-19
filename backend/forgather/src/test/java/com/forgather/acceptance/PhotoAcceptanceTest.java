package com.forgather.acceptance;

import static org.assertj.core.api.SoftAssertions.assertSoftly;

import java.time.LocalDateTime;
import java.util.List;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

import com.forgather.domain.space.dto.DownloadPhotosRequest;
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
        var photo = photoRepository.save(new Photo(space, "path", new PhotoMetaData(LocalDateTime.now())));

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

    @Test
    @Transactional
    @DisplayName("사진 단일 다운로드를 위한 URL을 발급한다.")
    void issueSingleDownloadUrl() {
        // given
        var space = spaceRepository.save(new Space("space-code", "1234", "test-space", 3, LocalDateTime.now()));
        var photo = photoRepository.save(new Photo(space, "path", new PhotoMetaData(LocalDateTime.now())));

        // when
        var response = RestAssuredMockMvc.given()
            .when()
            .post("/spaces/{spaceCode}/photos/download/{photoId}/urls", space.getCode(), photo.getId())
            .then()
            .extract();

        // then
        assertSoftly(softly -> {
            softly.assertThat(response.statusCode()).isEqualTo(200);
            softly.assertThat(response.body().jsonPath().getList("downloadUrls")).hasSize(1);
        });
    }

    @Test
    @Transactional
    @DisplayName("사진 선택 다운로드를 위한 URL을 발급한다.")
    void issueSelectedDownloadUrl() {
        // given
        var space = spaceRepository.save(new Space("space-code", "1234", "test-space", 3, LocalDateTime.now()));
        var photo1 = photoRepository.save(new Photo(space, "path1", new PhotoMetaData(LocalDateTime.now())));
        var photo2 = photoRepository.save(new Photo(space, "path2", new PhotoMetaData(LocalDateTime.now())));
        photoRepository.save(new Photo(space, "path3", new PhotoMetaData(LocalDateTime.now())));
        var request = new DownloadPhotosRequest(List.of(photo1.getId(), photo2.getId()));

        // when
        var response = RestAssuredMockMvc.given()
            .contentType("application/json")
            .accept("application/json")
            .body(request)
            .when()
            .post("/spaces/{spaceCode}/photos/download/selected-urls", space.getCode())
            .then()
            .extract();

        // then
        assertSoftly(softly -> {
            softly.assertThat(response.statusCode()).isEqualTo(200);
            softly.assertThat(response.body().jsonPath().getList("downloadUrls")).hasSize(2);
        });
    }

    @Test
    @Transactional
    @DisplayName("사진 일괄 다운로드를 위한 URL을 발급한다.")
    void issueAllDownloadUrl() {
        // given
        var space = spaceRepository.save(new Space("space-code", "1234", "test-space", 3, LocalDateTime.now()));
        photoRepository.save(new Photo(space, "path1", new PhotoMetaData(LocalDateTime.now())));
        photoRepository.save(new Photo(space, "path2", new PhotoMetaData(LocalDateTime.now())));
        photoRepository.save(new Photo(space, "path3", new PhotoMetaData(LocalDateTime.now())));

        // when
        var response = RestAssuredMockMvc.given()
            .when()
            .post("/spaces/{spaceCode}/photos/download/urls", space.getCode())
            .then()
            .extract();

        // then
        assertSoftly(softly -> {
            softly.assertThat(response.statusCode()).isEqualTo(200);
            softly.assertThat(response.body().jsonPath().getList("downloadUrls")).hasSize(3);
        });
    }
}
