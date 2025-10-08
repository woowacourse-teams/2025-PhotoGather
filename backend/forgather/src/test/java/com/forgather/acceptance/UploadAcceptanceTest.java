package com.forgather.acceptance;

import static com.forgather.domain.upload.domain.UploadCategory.GUESTBOOK;
import static com.forgather.fixture.SpaceFixture.createSpace;
import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertAll;
import static org.mockito.Mockito.anyString;
import static org.mockito.Mockito.when;

import java.util.List;
import java.util.Map;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;

import com.forgather.domain.upload.dto.IssueSignedUrlRequest;
import com.forgather.domain.upload.dto.IssueSignedUrlResponse;
import com.forgather.domain.space.model.Space;
import com.forgather.domain.space.repository.SpaceRepository;
import com.forgather.domain.upload.AwsS3Cloud;

import io.restassured.http.ContentType;
import io.restassured.module.mockmvc.RestAssuredMockMvc;

@AutoConfigureMockMvc
public class UploadAcceptanceTest extends AcceptanceTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private SpaceRepository spaceRepository;

    @MockitoBean
    private AwsS3Cloud awsS3Cloud;

    private Space space;

    @BeforeEach
    void setUp() {
        space = createSpace();
        spaceRepository.save(space);
        RestAssuredMockMvc.mockMvc(mockMvc);
    }

    @DisplayName("서명된 url 발급")
    @Test
    public void issueSignedUrls() {
        // given
        IssueSignedUrlRequest request = new IssueSignedUrlRequest(GUESTBOOK, List.of("abc.jpg", "def.jpg", "hij.png"));
        when(awsS3Cloud.getRootDirectory()).thenReturn("photogather/v2");
        when(awsS3Cloud.issueSignedUrl(anyString())).thenAnswer(invocation -> {
            String path = invocation.getArgument(0);
            return "test-prefix-" + path + "-test-suffix";
        });

        // when
        Map<String, String> result = RestAssuredMockMvc.given()
            .contentType(ContentType.JSON)
            .accept(ContentType.JSON)
            .body(request)
            .when()
            .post("/spaces/%s/upload/signed-urls".formatted(space.getCode()))
            .then()
            .statusCode(200)
            .extract()
            .body()
            .as(IssueSignedUrlResponse.class)
            .signedUrls();

        // then
        assertAll(
            () -> assertThat(result.get("abc.jpg"))
                .isEqualTo("test-prefix-photogather/v2/spaces/1234567890/guestbook/abc.jpg-test-suffix"),
            () -> assertThat(result.get("def.jpg"))
                .isEqualTo("test-prefix-photogather/v2/spaces/1234567890/guestbook/def.jpg-test-suffix"),
            () -> assertThat(result.get("hij.png"))
                .isEqualTo("test-prefix-photogather/v2/spaces/1234567890/guestbook/hij.png-test-suffix")
        );
    }
}
