package com.forgather.acceptance;

import static com.forgather.fixture.HostFixture.createHost;
import static java.time.Duration.ofSeconds;
import static org.assertj.core.api.Assertions.assertThat;
import static org.awaitility.Awaitility.await;
import static org.junit.jupiter.api.Assertions.assertAll;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyList;
import static org.mockito.Mockito.atLeast;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.verify;

import java.io.IOException;
import java.util.List;

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
import com.forgather.domain.guestbook.model.Guest;
import com.forgather.domain.guestbook.model.GuestBookCard;
import com.forgather.domain.guestbook.repository.GuestBookCardPhotoRepository;
import com.forgather.domain.guestbook.repository.GuestBookCardRepository;
import com.forgather.domain.guestbook.repository.GuestRepository;
import com.forgather.domain.product.model.Product;
import com.forgather.domain.product.repository.ProductPhotoRepository;
import com.forgather.domain.product.repository.ProductRepository;
import com.forgather.domain.space.dto.CreateSpaceRequest;
import com.forgather.domain.space.dto.CreateSpaceResponse;
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
import com.forgather.fixture.GuestBookCardPhotoFixture;
import com.forgather.fixture.GuestFixture;
import com.forgather.fixture.ProductFixture;
import com.forgather.fixture.ProductPhotoFixture;
import com.forgather.fixture.SpaceFixture;
import com.forgather.fixture.SpacePhotoFixture;
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
    private GuestBookCardPhotoRepository guestBookCardPhotoRepository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private ProductPhotoRepository productPhotoRepository;

    @Autowired
    private JwtTokenProvider jwtTokenProvider;

    @Autowired
    private ObjectMapper objectMapper;

    @MockitoBean
    private ContentsStorage contentsStorage;

    private Host host;
    private String token;

    @BeforeEach
    void setUp() throws IOException {
        RestAssuredMockMvc.mockMvc(mockMvc);
        Mockito.when(contentsStorage.upload(any(), any()))
            .thenReturn("forgather/temp.png");

        host = createHost();
        hostRepository.save(host);
        token = jwtTokenProvider.generateAccessToken(host.getId());
    }

    @DisplayName("스페이스를 생성한다.")
    @Test
    void createSpace() throws Exception {
        // given
        MockMultipartFile file = new MockMultipartFile(
            "file",
            "test.jpg",
            "image/jpeg",
            "test image content".getBytes()
        );
        String request = objectMapper.writeValueAsString(
            new CreateSpaceRequest("test-space", "description", false, "forgather_official",
                "forgather@forgather.me")
        );

        // when
        CreateSpaceResponse response = RestAssuredMockMvc.given()
            .header("Authorization", "Bearer " + token)
            .multiPart("request", request, "application/json")
            .multiPart("file", file.getOriginalFilename(), file.getBytes(), file.getContentType())
            .when()
            .post("/spaces")
            .then()
            .statusCode(HttpStatus.CREATED.value())
            .extract()
            .body()
            .as(CreateSpaceResponse.class);

        // then
        assertThat(response.spaceCode()).isNotEmpty();
    }

    @DisplayName("스페이스 사진이 없는 스페이스를 생성한다.")
    @Test
    void createSpaceWithoutFile() throws Exception {
        // given
        String request = objectMapper.writeValueAsString(
            new CreateSpaceRequest("test-space", "description", false, "forgather_official",
                "forgather@forgather.me")
        );

        // when
        CreateSpaceResponse response = RestAssuredMockMvc.given()
            .header("Authorization", "Bearer " + token)
            .multiPart("request", request, "application/json")
            .when()
            .post("/spaces")
            .then()
            .statusCode(HttpStatus.CREATED.value())
            .extract()
            .body()
            .as(CreateSpaceResponse.class);

        // then
        assertThat(response.spaceCode()).isNotEmpty();
    }

    @DisplayName("스페이스를 생성하려면 로그인이 필요하다.")
    @Test
    void createSpaceWithoutLogin() throws Exception {
        // given
        String request = objectMapper.writeValueAsString(
            new CreateSpaceRequest("test-space", "description", false, "forgather_official",
                "forgather@forgather.me")
        );

        // when
        var response = RestAssuredMockMvc.given()
            .multiPart("request", request, "application/json")
            .when()
            .post("/spaces")
            .then()
            .extract();

        // then
        assertThat(response.statusCode()).isEqualTo(HttpStatus.UNAUTHORIZED.value());
    }

    @DisplayName("스페이스를 상세 조회한다.")
    @Test
    void getSpaceInformation() {
        // given
        Space space = spaceRepository.save(SpaceFixture.createSpace());
        SpacePhoto spacePhoto = spacePhotoRepository.save(SpacePhotoFixture.createSpacePhotoWithSpace(space));
        spaceHostMapRepository.save(new SpaceHostMap(space, host));
        Guest guest1 = guestRepository.save(GuestFixture.createGuest());
        Guest guest2 = guestRepository.save(GuestFixture.createGuest());
        guestBookCardRepository.save(GuestBookCardFixture.createGuestBookCard(space, guest1, "카드1"));
        guestBookCardRepository.save(GuestBookCardFixture.createGuestBookCard(space, guest2, "카드2"));

        // when
        SpaceResponse result = RestAssuredMockMvc.given()
            .header("Authorization", "Bearer " + token)
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

    @DisplayName("스페이스를 삭제한다.")
    @Test
    void deleteSpace() {
        // given
        Space space = spaceRepository.save(SpaceFixture.createSpace());
        spacePhotoRepository.save(SpacePhotoFixture.createSpacePhotoWithSpace(space));
        spaceHostMapRepository.save(new SpaceHostMap(space, host));

        // when
        var response = RestAssuredMockMvc.given()
            .header("Authorization", "Bearer " + token)
            .when()
            .delete("/spaces/{spaceCode}", space.getCode())
            .then()
            .extract();

        // then
        assertAll(
            () -> assertThat(response.statusCode()).isEqualTo(204),
            () -> assertThat(spaceRepository.findByCode(space.getCode())).isEmpty(),
            () -> assertThat(spacePhotoRepository.findBySpace(space)).isEmpty(),

            () -> await().atMost(ofSeconds(6))
                .untilAsserted(() -> verify(contentsStorage, atLeast(1)).deletePhotos(anyList()))
        );
    }

    @DisplayName("스페이스, 작품, 방명록 모두 삭제한다.")
    @Test
    void deleteSpaceWithRelatedThings() {
        // given
        Space space = spaceRepository.save(SpaceFixture.createSpace());
        spacePhotoRepository.save(SpacePhotoFixture.createSpacePhotoWithSpace(space));
        spaceHostMapRepository.save(new SpaceHostMap(space, host));
        Product product = productRepository.save(ProductFixture.createProductWithSpace(space));
        productPhotoRepository.save(ProductPhotoFixture.createProductPhotoWithProduct(product));
        Guest guest = guestRepository.save(GuestFixture.createGuest());
        GuestBookCard guestBookCard = guestBookCardRepository.save(
            GuestBookCardFixture.createGuestBookCard(space, guest, "message"));
        guestBookCardPhotoRepository.saveAll(List.of(
            GuestBookCardPhotoFixture.createGuestBookCardPhotoWithGuestBookCard(guestBookCard)));

        // when
        var response = RestAssuredMockMvc.given()
            .header("Authorization", "Bearer " + token)
            .when()
            .delete("/spaces/{spaceCode}", space.getCode())
            .then()
            .extract();

        // then
        assertAll(
            () -> assertThat(response.statusCode()).isEqualTo(204),
            () -> assertThat(spaceRepository.findByCode(space.getCode())).isEmpty(),
            () -> assertThat(spacePhotoRepository.findBySpace(space)).isEmpty(),
            () -> assertThat(productRepository.findBySpace(space)).isEmpty(),
            () -> assertThat(productPhotoRepository.findAllByProduct(product)).isEmpty(),
            () -> assertThat(guestBookCardRepository.findAllBySpace(space)).isEmpty(),
            () -> assertThat(guestBookCardPhotoRepository.findAllByGuestBookCard(guestBookCard)).isEmpty(),

            () -> await().atMost(ofSeconds(6))
                .untilAsserted(() -> verify(contentsStorage, atLeast(1)).deletePhotos(anyList()))
        );
    }

    @DisplayName("로그인 없이 스페이스를 삭제할 수 없다.")
    @Test
    void deleteSpaceWithoutLogin() {
        // given
        Space space = spaceRepository.save(SpaceFixture.createSpace());
        spacePhotoRepository.save(SpacePhotoFixture.createSpacePhotoWithSpace(space));
        spaceHostMapRepository.save(new SpaceHostMap(space, host));

        // when
        var response = RestAssuredMockMvc.given()
            .when()
            .delete("/spaces/{spaceCode}", space.getCode())
            .then()
            .extract();

        // then
        assertThat(response.statusCode()).isEqualTo(HttpStatus.UNAUTHORIZED.value());
    }

    @DisplayName("스페이스의 호스트가 아니면 삭제할 수 없다.")
    @Test
    void deleteSpaceWithOtherHost() {
        // given
        Space space = spaceRepository.save(SpaceFixture.createSpace());
        spacePhotoRepository.save(SpacePhotoFixture.createSpacePhotoWithSpace(space));
        spaceHostMapRepository.save(new SpaceHostMap(space, host));
        Host otherHost = hostRepository.save(createHost());
        String otherToken = jwtTokenProvider.generateAccessToken(otherHost.getId());

        // when
        var response = RestAssuredMockMvc.given()
            .header("Authorization", "Bearer " + otherToken)
            .when()
            .delete("/spaces/{spaceCode}", space.getCode())
            .then()
            .extract();

        // then
        assertThat(response.statusCode()).isEqualTo(HttpStatus.FORBIDDEN.value());
    }

    @DisplayName("스페이스를 수정한다.")
    @Test
    void updateSpace() throws Exception {
        // given
        Space space = spaceRepository.save(SpaceFixture.createSpace());
        spacePhotoRepository.save(new SpacePhoto(space, "original.png", "forgather/uuid.png", 1024L));
        spaceHostMapRepository.save(new SpaceHostMap(space, host));

        MockMultipartFile newFile = new MockMultipartFile(
            "file",
            "new.jpg",
            "image/jpeg",
            "new image content".getBytes()
        );
        String request = objectMapper.writeValueAsString(new UpdateSpaceRequest(
            "새로운 스페이스", "새로운 설명", false, "forgather_official_new", "forgather_new@forgather.me", true)
        );

        // when
        SpaceResponse result = RestAssuredMockMvc.given()
            .header("Authorization", "Bearer " + token)
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
            () -> assertThat(result.guestBookCardCount()).isZero(),

            () -> await().atMost(ofSeconds(6))
                .untilAsserted(() -> verify(contentsStorage, atLeast(1)).deletePhotos(anyList()))
        );
    }

    @DisplayName("스페이스 이름만 수정한다.")
    @Test
    void updateOnlySpaceName() throws Exception {
        // given
        Space space = spaceRepository.save(SpaceFixture.createSpace());
        spacePhotoRepository.save(SpacePhotoFixture.createSpacePhotoWithSpace(space));
        spaceHostMapRepository.save(new SpaceHostMap(space, host));

        String request = objectMapper.writeValueAsString(new UpdateSpaceRequest(
            "새로운 스페이스", null, null, null, null, false)
        );

        // when
        SpaceResponse response = RestAssuredMockMvc.given()
            .header("Authorization", "Bearer " + token)
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
            () -> assertThat(response.description()).isEqualTo("description"),
            () -> assertThat(response.isPublic()).isTrue(),
            () -> assertThat(response.instagramUsername()).isEqualTo("instagramUsername"),
            () -> assertThat(response.email()).isEqualTo("email@forgather.me"),
            () -> assertThat(response.spacePhoto().path()).isEqualTo("path"),

            () -> verify(contentsStorage, never()).deletePhotos(anyList())
        );
    }

    @DisplayName("로그인 없이 스페이스를 수정할 수 없다.")
    @Test
    void updateWithoutLogin() throws Exception {
        // given
        Space space = spaceRepository.save(SpaceFixture.createSpace());
        spacePhotoRepository.save(SpacePhotoFixture.createSpacePhotoWithSpace(space));
        spaceHostMapRepository.save(new SpaceHostMap(space, host));

        String request = objectMapper.writeValueAsString(new UpdateSpaceRequest(
            "새로운 스페이스", null, null, null, null, false)
        );

        // when
        var response = RestAssuredMockMvc.given()
            .multiPart("request", request, "application/json")
            .when()
            .patch("/spaces/{spaceCode}", space.getCode())
            .then()
            .extract();

        // then
        assertThat(response.statusCode()).isEqualTo(HttpStatus.UNAUTHORIZED.value());
    }

    @DisplayName("스페이스의 호스트가 아니면 수정할 수 없다.")
    @Test
    void updateWithOtherHost() throws Exception {
        // given
        Space space = spaceRepository.save(SpaceFixture.createSpace());
        spacePhotoRepository.save(SpacePhotoFixture.createSpacePhotoWithSpace(space));
        spaceHostMapRepository.save(new SpaceHostMap(space, host));
        Host otherHost = hostRepository.save(createHost());
        String otherToken = jwtTokenProvider.generateAccessToken(otherHost.getId());

        String request = objectMapper.writeValueAsString(new UpdateSpaceRequest(
            "새로운 스페이스", null, null, null, null, false)
        );

        // when
        var response = RestAssuredMockMvc.given()
            .header("Authorization", "Bearer " + otherToken)
            .multiPart("request", request, "application/json")
            .when()
            .patch("/spaces/{spaceCode}", space.getCode())
            .then()
            .extract();

        // then
        assertThat(response.statusCode()).isEqualTo(HttpStatus.FORBIDDEN.value());
    }

    @DisplayName("나의 스페이스 목록을 조회한다.")
    @Test
    void getSpaces() {
        // given
        Space space1 = spaceRepository.save(SpaceFixture.createSpace());
        spacePhotoRepository.save(SpacePhotoFixture.createSpacePhotoWithSpace(space1));
        Space space2 = spaceRepository.save(SpaceFixture.createPrivateSpace());
        spacePhotoRepository.save(SpacePhotoFixture.createSpacePhotoWithSpace(space2));
        spaceHostMapRepository.save(new SpaceHostMap(space1, host));
        spaceHostMapRepository.save(new SpaceHostMap(space2, host));
        Guest guest1 = guestRepository.save(GuestFixture.createGuest());
        guestBookCardRepository.save(GuestBookCardFixture.createGuestBookCard(space1, guest1, "방명록1"));

        // when
        HostSpaceResponse result = RestAssuredMockMvc.given()
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
            () -> assertThat(result.spaces().getFirst().spaceCode()).isEqualTo(space2.getCode()),
            () -> assertThat(result.spaces().getFirst().guestBookCardCount()).isZero(),

            () -> assertThat(result.spaces().getLast().spaceCode()).isEqualTo(space1.getCode()),
            () -> assertThat(result.spaces().getLast().guestBookCardCount()).isEqualTo(1)
        );
    }
}
