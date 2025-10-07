package com.forgather.acceptance;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;
import static org.junit.jupiter.api.Assertions.assertAll;
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
import com.forgather.domain.space.model.Space;
import com.forgather.domain.space.model.SpacePhoto;
import com.forgather.domain.space.repository.HostRepository;
import com.forgather.domain.space.repository.SpacePhotoRepository;
import com.forgather.domain.space.repository.SpaceRepository;
import com.forgather.domain.upload.ContentsStorage;
import com.forgather.global.auth.model.Host;
import com.forgather.global.auth.util.JwtTokenProvider;

import io.restassured.module.mockmvc.RestAssuredMockMvc;
import io.restassured.path.json.JsonPath;

@DisplayName("인수 테스트: Space")
@AutoConfigureMockMvc
class SpaceAcceptanceTest extends AcceptanceTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private HostRepository hostRepository;

    @Autowired
    private SpaceRepository spaceRepository;

    @Autowired
    private SpacePhotoRepository spacePhotoRepository;

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

    @DisplayName("RestAssuredMockMvc를 사용하여 Space를 생성한다.")
    @Test
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

    @DisplayName("RestAssuredMockMvc를 사용하여 스페이스 사진이 없는 Space를 생성한다.")
    @Test
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

    @DisplayName("RestAssuredMockMvc를 사용하여 스페이스를 상세 조회한다.")
    @Test
    void getSpaceInformationWithRestAssuredMockMvc() {
        // given
        var host = hostRepository.save(new Host("모코", "pictureUrl"));
        var token = jwtTokenProvider.generateAccessToken(host.getId());
        var space = spaceRepository.save(new Space(host, "1234567890", "테스트", "테스트 스페이스", true,
            "forgather_official", "forgather@forgather.me"));
        var spacePhoto = spacePhotoRepository.save(
            new SpacePhoto(space, "original.png", "/forgather/uuid.png", 1024L));

        // when
        var response = RestAssuredMockMvc.given()
            .header("Authorization", "Bearer " + token)
            .when()
            .get("/spaces/{spaceCode}", space.getCode())
            .then()
            .extract();

        // then
        assertThat(response.statusCode()).isEqualTo(200);
        JsonPath jsonPath = response.body().jsonPath();
        assertAll(
            () -> assertThat(jsonPath.getString("spaceCode")).isEqualTo(space.getCode()),
            () -> assertThat(jsonPath.getString("profilePath")).isEqualTo(spacePhoto.getPath())
        );
    }

    @DisplayName("RestAssuredMockMvc를 사용하여 스페이스를 삭제한다.")
    @Test
    void deleteSpaceWithRestAssuredMockMvc() {
        // given
        var host = hostRepository.save(new Host("모코", "pictureUrl"));
        var token = jwtTokenProvider.generateAccessToken(host.getId());
        var space = spaceRepository.save(new Space(host, "1234567890", "테스트", "테스트 스페이스", true,
            "forgather_official", "forgather@forgather.me"));
        var spacePhoto = spacePhotoRepository.save(
            new SpacePhoto(space, "original.png", "/forgather/uuid.png", 1024L));

        // when
        var response = RestAssuredMockMvc.given()
            .header("Authorization", "Bearer " + token)
            .when()
            .delete("/spaces/{spaceCode}", space.getCode())
            .then()
            .extract();

        // then
        assertThat(response.statusCode()).isEqualTo(204);
        assertThat(spaceRepository.findByCode(space.getCode())).isEmpty();
        assertThat(spacePhotoRepository.findBySpace(space)).isEmpty();
    }
}
