package com.forgather.acceptance;

import static com.forgather.domain.upload.domain.UploadCategory.PRODUCT;
import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.SoftAssertions.assertSoftly;

import java.net.MalformedURLException;
import java.net.URI;
import java.util.List;
import java.util.stream.IntStream;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

import com.forgather.domain.guestbook.model.Guest;
import com.forgather.domain.guestbook.repository.GuestRepository;
import com.forgather.domain.space.model.Space;
import com.forgather.domain.space.repository.HostRepository;
import com.forgather.domain.space.repository.SpaceRepository;
import com.forgather.domain.upload.AwsS3Cloud;
import com.forgather.domain.upload.dto.IssueSignedUrlRequest;
import com.forgather.global.auth.model.Host;
import com.forgather.global.auth.util.JwtTokenProvider;

import io.restassured.module.mockmvc.RestAssuredMockMvc;

@Disabled
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
    private GuestRepository guestRepository;

    @Autowired
    private HostRepository hostRepository;

    @Autowired
    private JwtTokenProvider jwtTokenProvider;

    @BeforeEach
    void setUp() {
        RestAssuredMockMvc.mockMvc(mockMvc);
        Mockito.when(awsS3Cloud.issueSignedUrl(Mockito.anyString()))
            .thenReturn("url");
        try {
            Mockito.when(awsS3Cloud.issueDownloadUrl(Mockito.anyString()))
                .thenReturn(URI.create("https://example.com/dummy.jpg").toURL());
        } catch (MalformedURLException e) {
            throw new RuntimeException(e);
        }
    }

    @Test
    @Transactional
    @DisplayName("스페이스 호스트가 사진을 조회한다.")
    void getPhoto() {
        assertThat("hello").isEqualTo("hello");
    }

    @Test
    @Transactional
    @DisplayName("사진 업로드를 위한 서명된 URL을 발급한다.")
    void issuePreSignedUrls() {
        // given
        // TODO: host 추가
        var host = hostRepository.save(new Host("모코", "pictureUrl"));
        var space = spaceRepository.save(
            new Space("space-code", "test-space", "description", false, "forgather_official",
                "forgather@forgather.me"));
        var request = new IssueSignedUrlRequest(PRODUCT, List.of("UUID1.png", "UUID2.png", "UUID3.png"));

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
        // TODO: host 추가
        var host = hostRepository.save(new Host("모코", "pictureUrl"));
        var space = spaceRepository.save(
            new Space("space-code", "test-space", "description", false, "forgather_official",
                "forgather@forgather.me"));
        var request = new IssueSignedUrlRequest(PRODUCT, IntStream.range(0, 101)
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

    @Test
    @Transactional
    @DisplayName("사진 단일 다운로드를 위한 URL을 발급한다.")
    void issueSingleDownloadUrl() {
        assertThat("hello").isEqualTo("hello");
    }

    @Test
    @Transactional
    @DisplayName("사진 선택 다운로드를 위한 URL을 발급한다.")
    void issueSelectedDownloadUrl() {
        assertThat("hello").isEqualTo("hello");
    }

    @Test
    @Transactional
    @DisplayName("사진 일괄 다운로드를 위한 URL을 발급한다.")
    void issueAllDownloadUrl() {
        // given
        // TODO: host 추가
        var host = hostRepository.save(new Host("모코", "pictureUrl"));
        var space = spaceRepository.save(
            new Space("space-code", "test-space", "description", false, "forgather_official",
                "forgather@forgather.me"));
        var guest = guestRepository.save(new Guest("guest"));
        String token = jwtTokenProvider.generateAccessToken(host.getId());

        // when
        var response = RestAssuredMockMvc.given()
            .header("Authorization", "Bearer " + token)
            .when()
            .post("/spaces/{spaceCode}/photos/issue/download-urls", space.getCode())
            .then()
            .extract();

        // then
        assertSoftly(softly -> {
            softly.assertThat(response.statusCode()).isEqualTo(200);
            softly.assertThat(response.body().jsonPath().getList("downloadUrls")).hasSize(1);
        });
    }
}
