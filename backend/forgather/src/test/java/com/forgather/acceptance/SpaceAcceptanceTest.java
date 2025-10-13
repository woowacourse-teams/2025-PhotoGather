package com.forgather.acceptance;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertAll;
import static org.mockito.ArgumentMatchers.any;

import java.io.IOException;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.http.HttpStatus;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.forgather.domain.guestbook.repository.GuestBookCardRepository;
import com.forgather.domain.guestbook.repository.GuestRepository;
import com.forgather.domain.space.dto.CreateSpaceRequest;
import com.forgather.domain.space.dto.HostSpaceResponse;
import com.forgather.domain.space.dto.SpaceResponse;
import com.forgather.domain.space.dto.UpdateSpaceRequest;
import com.forgather.domain.space.model.Space;
import com.forgather.domain.space.model.SpacePhoto;
import com.forgather.domain.space.repository.HostRepository;
import com.forgather.domain.space.repository.SpacePhotoRepository;
import com.forgather.domain.space.repository.SpaceRepository;
import com.forgather.domain.upload.domain.ContentsStorage;
import com.forgather.fixture.GuestBookCardFixture;
import com.forgather.fixture.GuestFixture;
import com.forgather.global.auth.model.Host;
import com.forgather.global.auth.model.SpaceHostMap;
import com.forgather.global.auth.repository.SpaceHostMapRepository;
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
    private SpaceRepository spaceRepository;

    @Autowired
    private SpacePhotoRepository spacePhotoRepository;

    @Autowired
    private SpaceHostMapRepository spaceHostMapRepository;

    @Autowired
    private GuestRepository guestRepository;

    @Autowired
    private GuestBookCardRepository guestBookCardRepository;

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
            .thenReturn("forgather/temp.png");
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
        // TODO: host 추가
        var space = spaceRepository.save(new Space("1111111111", "테스트", "테스트 스페이스", true,
            "forgather_official", "forgather@forgather.me"));
        var spacePhoto = spacePhotoRepository.save(
            new SpacePhoto(space, "original.png", "forgather/uuid.png", 1024L));
        spaceHostMapRepository.save(new SpaceHostMap(space, host));
        var guest1 = guestRepository.save(GuestFixture.createGuest());
        var guest2 = guestRepository.save(GuestFixture.createGuest());
        guestBookCardRepository.save(GuestBookCardFixture.createGuestBookCard(space, guest1, "카드1"));
        guestBookCardRepository.save(GuestBookCardFixture.createGuestBookCard(space, guest2, "카드2"));

        // when
        var result = RestAssuredMockMvc.given()
            // .header("Authorization", "Bearer " + token)
            .when()
            .get("/spaces/{spaceCode}", space.getCode())
            .then()
            .statusCode(HttpStatus.OK.value())
            .extract()
            .body()
            .as(SpaceResponse.class);

        // then
        assertAll(
            () -> assertThat(result.spaceCode()).isEqualTo(space.getCode()),
            () -> assertThat(result.spacePhoto().path()).isEqualTo(spacePhoto.getPath()),
            () -> assertThat(result.guestBookCardCount()).isEqualTo(2)
        );
    }

    @DisplayName("RestAssuredMockMvc를 사용하여 스페이스를 삭제한다.")
    @Test
    void deleteSpaceWithRestAssuredMockMvc() {
        // given
        var host = hostRepository.save(new Host("모코", "pictureUrl"));
        var token = jwtTokenProvider.generateAccessToken(host.getId());
        // TODO: host 추가
        var space = spaceRepository.save(new Space("2222222222", "테스트", "테스트 스페이스", true,
            "forgather_official", "forgather@forgather.me"));
        spacePhotoRepository.save(new SpacePhoto(space, "original.png", "forgather/uuid.png", 1024L));
        spaceHostMapRepository.save(new SpaceHostMap(space, host));

        // when
        var response = RestAssuredMockMvc.given()
            // .header("Authorization", "Bearer " + token)
            .when()
            .delete("/spaces/{spaceCode}", space.getCode())
            .then()
            .extract();

        // then
        assertThat(response.statusCode()).isEqualTo(204);
        assertThat(spaceRepository.findByCode(space.getCode())).isEmpty();
        assertThat(spacePhotoRepository.findBySpace(space)).isEmpty();
    }

    @DisplayName("RestAssuredMockMvc를 사용하여 스페이스를 수정한다.")
    @Test
    void updateSpaceWithRestAssuredMockMvc() throws Exception {
        // given
        var host = hostRepository.save(new Host("모코", "pictureUrl"));
        var token = jwtTokenProvider.generateAccessToken(host.getId());
        var space = spaceRepository.save(new Space("3333333333", "테스트", "테스트 스페이스", true,
            "forgather_official", "forgather@forgather.me"));
        spacePhotoRepository.save(new SpacePhoto(space, "original.png", "forgather/uuid.png", 1024L));
        spaceHostMapRepository.save(new SpaceHostMap(space, host));

        var newFile = new MockMultipartFile(
            "file",
            "new.jpg",
            "image/jpeg",
            "new image content".getBytes()
        );
        var request = objectMapper.writeValueAsString(new UpdateSpaceRequest(
            "새로운 스페이스", "새로운 설명", false, "forgather_official_new", "forgather_new@forgather.me", true)
        );

        // when
        var result = RestAssuredMockMvc.given()
            // .header("Authorization", "Bearer " + token)
            .multiPart("request", request, "application/json")
            .multiPart("file", newFile.getOriginalFilename(), newFile.getBytes(), newFile.getContentType())
            .when()
            .patch("/spaces/{spaceCode}", space.getCode())
            .then()
            .statusCode(HttpStatus.OK.value())
            .extract()
            .body()
            .as(SpaceResponse.class);

        // then
        assertAll(
            () -> assertThat(result.name()).isEqualTo("새로운 스페이스"),
            () -> assertThat(result.description()).isEqualTo("새로운 설명"),
            () -> assertThat(result.isPublic()).isFalse(),
            () -> assertThat(result.instagramUsername()).isEqualTo("forgather_official_new"),
            () -> assertThat(result.email()).isEqualTo("forgather_new@forgather.me"),
            () -> assertThat(spacePhotoRepository.getBySpaceOrEmpty(space).getOriginalName()).isEqualTo("new.jpg"),
            () -> assertThat(result.guestBookCardCount()).isZero()
        );
    }

    @DisplayName("RestAssuredMockMvc를 사용하여 스페이스 이름만 수정한다.")
    @Test
    void updateOnlySpaceNameWithRestAssuredMockMvc() throws Exception {
        // given
        var host = hostRepository.save(new Host("모코", "pictureUrl"));
        var token = jwtTokenProvider.generateAccessToken(host.getId());
        var space = spaceRepository.save(new Space("4444444444", "테스트", "테스트 스페이스", true,
            "forgather_official", "forgather@forgather.me"));
        spacePhotoRepository.save(new SpacePhoto(space, "original.png", "forgather/origin.png", 1024L));
        spaceHostMapRepository.save(new SpaceHostMap(space, host));

        var request = objectMapper.writeValueAsString(new UpdateSpaceRequest(
            "새로운 스페이스", null, null, null, null, false)
        );

        // when
        var response = RestAssuredMockMvc.given()
            // .header("Authorization", "Bearer " + token)
            .multiPart("request", request, "application/json")
            .when()
            .patch("/spaces/{spaceCode}", space.getCode())
            .then()
            .statusCode(HttpStatus.OK.value())
            .extract()
            .body()
            .as(SpaceResponse.class);

        // then
        assertAll(
            () -> assertThat(response.name()).isEqualTo("새로운 스페이스"),
            () -> assertThat(response.description()).isEqualTo("테스트 스페이스"),
            () -> assertThat(response.isPublic()).isTrue(),
            () -> assertThat(response.instagramUsername()).isEqualTo("forgather_official"),
            () -> assertThat(response.email()).isEqualTo("forgather@forgather.me"),
            () -> assertThat(response.spacePhoto().path()).isEqualTo("forgather/origin.png")
        );
    }

    @DisplayName("RestAssuredMockMvc를 사용하여 나의 스페이스 목록을 조회한다.")
    @Test
    void getSpacesWithRestAssuredMockMvc() {
        // given
        var host = hostRepository.save(new Host("모코", "pictureUrl"));
        var token = jwtTokenProvider.generateAccessToken(host.getId());
        var space1 = spaceRepository.save(new Space("1234567890", "테스트1", "테스트 스페이스1", true,
            "forgather_official", "forgather@forgather.me"));
        spacePhotoRepository.save(new SpacePhoto(space1, "original.png", "forgather/uuid1.png", 1024L));
        var space2 = spaceRepository.save(new Space("0987654321", "테스트2", "테스트 스페이스2", true,
            "forgather_official", "forgather@forgather.me"));
        spacePhotoRepository.save(new SpacePhoto(space2, "original.png", "forgather/uuid2.png", 1024L));
        spaceHostMapRepository.save(new SpaceHostMap(space1, host));
        spaceHostMapRepository.save(new SpaceHostMap(space2, host));
        var guest1 = guestRepository.save(GuestFixture.createGuest());
        guestBookCardRepository.save(GuestBookCardFixture.createGuestBookCard(space1, guest1, "방명록1"));

        // when
        var result = RestAssuredMockMvc.given()
            .header("Authorization", "Bearer " + token)
            .when()
            .get("/spaces/me")
            .then()
            .statusCode(HttpStatus.OK.value())
            .extract()
            .body()
            .as(HostSpaceResponse.class);

        // then
        assertAll(
            () -> assertThat(result.spaces().getFirst().spaceCode()).isEqualTo("1234567890"),
            () -> assertThat(result.spaces().getFirst().guestBookCardCount()).isEqualTo(1),

            () -> assertThat(result.spaces().getLast().spaceCode()).isEqualTo("0987654321"),
            () -> assertThat(result.spaces().getLast().guestBookCardCount()).isZero()
        );
    }
}
