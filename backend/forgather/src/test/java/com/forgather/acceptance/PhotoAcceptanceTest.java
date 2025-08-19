package com.forgather.acceptance;

import static org.assertj.core.api.SoftAssertions.assertSoftly;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.IntStream;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

import com.forgather.domain.space.dto.IssueSignedUrlRequest;
import com.forgather.domain.space.model.Photo;
import com.forgather.domain.space.model.PhotoMetaData;
import com.forgather.domain.space.model.Space;
import com.forgather.domain.space.repository.PhotoRepository;
import com.forgather.domain.space.repository.SpaceRepository;
import com.forgather.domain.space.service.AwsS3Cloud;

import io.restassured.module.mockmvc.RestAssuredMockMvc;

@DisplayName("인수 테스트: Photo")
@AutoConfigureMockMvc
class PhotoAcceptanceTest extends AcceptanceTest {

    @Autowired
    private MockMvc mockMvc;

    @MockitoBean
    private AwsS3Cloud awsS3Cloud;

    @Autowired
    private SpaceRepository spaceRepository;

    @Autowired
    private PhotoRepository photoRepository;

    @BeforeEach
    void setUp() {
        RestAssuredMockMvc.mockMvc(mockMvc);
        Mockito.when(awsS3Cloud.issueSignedUrl(Mockito.anyString()))
            .thenReturn("url");
    }

    @Test
    @Transactional
    @DisplayName("스페이스 호스트가 사진을 조회한다.")
    void getPhoto() {
        // given
        var space = spaceRepository.save(new Space("space-code", "1234", "test-space", 3, LocalDateTime.now()));
        var photo = photoRepository.save(new Photo(space, "originalName.jpg", "path",
            new PhotoMetaData(LocalDateTime.now())));

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
    @DisplayName("사진 업로드를 위한 서명된 URL을 발급한다.")
    void issuePreSignedUrls() {
        // given
        var space = spaceRepository.save(new Space("space-code", "1234", "test-space", 3, LocalDateTime.now()));
        var request = new IssueSignedUrlRequest(List.of("UUID1.png", "UUID2.png", "UUID3.png"));

        // when
        var response = RestAssuredMockMvc.given()
            .contentType("application/json")
            .accept("application/json")
            .body(request)
            .when()
            .post("/spaces/{spaceCode}/photos/issue/upload-urls", space.getCode())
            .then()
            .extract();

        // then
        assertSoftly(softly -> {
            softly.assertThat(response.statusCode()).isEqualTo(200);
            softly.assertThat(response.body().jsonPath().getMap("signedUrls")).hasSize(3);
        });
    }

    @Test
    @Transactional
    @DisplayName("최대 발급 개수를 초과하면 서명된 URL 발급에 실패한다.")
    void issueExceedPreSignedUrls() {
        // given
        var space = spaceRepository.save(new Space("space-code", "1234", "test-space", 3, LocalDateTime.now()));
        var request = new IssueSignedUrlRequest(IntStream.range(0, 101)
            .mapToObj(i -> "UUID" + (i + 1) + ".png")
            .toList());

        // when
        var response = RestAssuredMockMvc.given()
            .contentType("application/json")
            .accept("application/json")
            .body(request)
            .when()
            .post("/spaces/{spaceCode}/photos/issue/upload-urls", space.getCode())
            .then()
            .extract();

        // then
        assertSoftly(softly -> {
            softly.assertThat(response.statusCode()).isEqualTo(400);
        });
    }
}
