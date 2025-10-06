package com.forgather.acceptance;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;
import static org.mockito.ArgumentMatchers.any;

import java.io.IOException;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.forgather.domain.space.dto.CreateSpaceRequest;
import com.forgather.domain.space.repository.HostRepository;
import com.forgather.domain.upload.ContentsStorage;
import com.forgather.global.auth.model.Host;
import com.forgather.global.auth.util.JwtTokenProvider;

import io.restassured.module.mockmvc.RestAssuredMockMvc;

@DisplayName("인수 테스트: Space")
@AutoConfigureMockMvc
class SpaceAcceptanceTest extends AcceptanceTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private HostRepository hostRepository;

    @Autowired
    private JwtTokenProvider jwtTokenProvider;

    @MockitoBean
    private ContentsStorage contentsStorage;

    @Autowired
    private ObjectMapper objectMapper;

    @BeforeEach
    void setUp() throws IOException {
        RestAssuredMockMvc.mockMvc(mockMvc);
        Mockito.when(contentsStorage.upload(any(), any()))
            .thenReturn("/forgather/temp.png");
    }

    @Test
    @DisplayName("RestAssuredMockMvc를 사용하여 Space를 생성한다.")
    void createSpaceWithRestAssuredMockMvc() throws Exception {
        // given
        var host = hostRepository.save(new Host("모코", "pictureUrl"));
        var token = jwtTokenProvider.generateAccessToken(host.getId());
        var file = new MockMultipartFile(
            "file",
            "test.jpg",
            "image/jpeg",
            "test image content".getBytes()
        );
        var request = objectMapper.writeValueAsString(
            new CreateSpaceRequest("test-space", "description", false, "forgather_official",
                "forgather@forgather.me")
        );

        // when
        var response = RestAssuredMockMvc.given()
            .header("Authorization", "Bearer " + token)
            .multiPart("request", request, "application/json")
            .multiPart("file", file.getOriginalFilename(), file.getBytes(), file.getContentType())
            .sessionAttr("host_id", host.getId())
            .when()
            .post("/spaces")
            .then()
            .extract();

        // then
        assertThat(response.statusCode()).isEqualTo(201);
        assertThat(response.body().jsonPath().getString("spaceCode")).isNotNull();
    }

    @Test
    @DisplayName("RestAssuredMockMvc를 사용하여 스페이스 사진이 없는 Space를 생성한다.")
    void createSpaceWithoutFileWithRestAssuredMockMvc() throws Exception {
        // given
        var host = hostRepository.save(new Host("모코", "pictureUrl"));
        var token = jwtTokenProvider.generateAccessToken(host.getId());
        var request = objectMapper.writeValueAsString(
            new CreateSpaceRequest("test-space", "description", false, "forgather_official",
                "forgather@forgather.me")
        );

        // when
        var response = RestAssuredMockMvc.given()
            .header("Authorization", "Bearer " + token)
            .multiPart("request", request, "application/json")
            .sessionAttr("host_id", host.getId())
            .when()
            .post("/spaces")
            .then()
            .extract();

        // then
        assertThat(response.statusCode()).isEqualTo(201);
        assertThat(response.body().jsonPath().getString("spaceCode")).isNotNull();
    }
}
