package com.forgather.acceptance;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.containsString;
import static org.junit.jupiter.api.Assertions.assertAll;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.IntStream;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;

import com.forgather.domain.guestbook.dto.DeleteGuestBookCardPhotosRequest;
import com.forgather.domain.guestbook.dto.GuestBookCardResponse;
import com.forgather.domain.guestbook.dto.WriteGuestBookCardPhotoRequest;
import com.forgather.domain.guestbook.dto.WriteGuestBookCardRequest;
import com.forgather.domain.guestbook.dto.WriteGuestBookCardResponse;
import com.forgather.domain.space.model.Space;
import com.forgather.domain.space.repository.SpaceRepository;
import com.forgather.domain.upload.AwsS3Cloud;
import com.forgather.fixture.SpaceFixture;

import io.restassured.http.ContentType;
import io.restassured.module.mockmvc.RestAssuredMockMvc;

/**
 * TODO
 * 비공개 스페이스 & 호스트 -> 방명록 조회 가능
 * 미읽음 스페이스 호스트 조회 -> 읽음 처리
 * 호스트가 아니면 방명록 카드 삭제 불가
 * 다른 스페이스에 대한 작업
 * 호스트가 아니면 방명록 카드 사진 삭제 불가
 */
@AutoConfigureMockMvc
public class GuestBookCardAcceptanceTest extends AcceptanceTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private SpaceRepository spaceRepository;

    @MockitoBean
    private AwsS3Cloud awsS3Cloud;

    private Space publicSpace;
    private Space privateSpace;
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
        publicSpace = SpaceFixture.createSpace();
        privateSpace = SpaceFixture.createPrivateSpace();
        spaceRepository.save(publicSpace);
        spaceRepository.save(privateSpace);
        RestAssuredMockMvc.mockMvc(mockMvc);
    }

    @DisplayName("공개 스페이스인 경우 방문자도 방명록 카드를 조회할 수 있다")
    @Test
    void guestCanReadCardInPublicSpace() {
        // given
        WriteGuestBookCardResponse writeResponse = writeGuestBookCard(publicSpace);

        // when
        GuestBookCardResponse result = RestAssuredMockMvc.given()
            .accept(ContentType.JSON)
            .when()
            .get("/spaces/%s/guestbook/%d".formatted(publicSpace.getCode(), writeResponse.id()))
            .then()
            .statusCode(200)
            .extract()
            .body()
            .as(GuestBookCardResponse.class);

        // then
        assertAll(
            () -> assertThat(result.id()).isNotNull(),
            () -> assertThat(result.nickname()).isEqualTo(writeRequest.nickname()),
            () -> assertThat(result.message()).isEqualTo(writeRequest.message()),
            () -> assertThat(result.createdAt()).isBetween(LocalDateTime.now().minusMinutes(1), LocalDateTime.now()),

            () -> assertThat(result.photos().get(0).originalName()).isEqualTo("photo1.jpg"),
            () -> assertThat(result.photos().get(0).path()).endsWith("/spaces/1234567890/guestbook/abc.jpg"),

            () -> assertThat(result.photos().get(1).originalName()).isEqualTo("photo2.jpg"),
            () -> assertThat(result.photos().get(1).path()).endsWith("/spaces/1234567890/guestbook/def.jpg"),

            () -> assertThat(result.photos().get(2).originalName()).isEqualTo("photo3.jpg"),
            () -> assertThat(result.photos().get(2).path()).endsWith("/spaces/1234567890/guestbook/ghi.jpg")
        );
    }

    @DisplayName("비공개 스페이스인 경우 방문자는 방명록 카드를 조회할 수 없다")
    @Test
    void throwExceptionWhenGuestReadCardInPrivateSpace() {
        // given
        WriteGuestBookCardResponse writeResponse = writeGuestBookCard(privateSpace);

        // when, then
        RestAssuredMockMvc.given()
            .accept(ContentType.JSON)
            .when()
            .get("/spaces/%s/guestbook/%d".formatted(privateSpace.getCode(), writeResponse.id()))
            .then()
            .statusCode(403)
            .body("message", containsString("방문자는 비공개 스페이스의 방명록을 조회할 수 없습니다."));
    }

    @DisplayName("방명록 카드 작성")
    @Test
    void write() {
        // when
        WriteGuestBookCardResponse result = writeGuestBookCard(publicSpace);

        // then
        assertAll(
            () -> assertThat(result.id()).isNotNull(),
            () -> assertThat(result.nickname()).isEqualTo(writeRequest.nickname()),
            () -> assertThat(result.message()).isEqualTo(writeRequest.message()),
            () -> assertThat(result.isRead()).isFalse(),
            () -> assertThat(result.createdAt()).isBetween(LocalDateTime.now().minusMinutes(1), LocalDateTime.now()),

            () -> assertThat(result.photos().get(0).originalName()).isEqualTo("photo1.jpg"),
            () -> assertThat(result.photos().get(0).path()).endsWith(
                "/spaces/%s/guestbook/abc.jpg".formatted(publicSpace.getCode())),

            () -> assertThat(result.photos().get(1).originalName()).isEqualTo("photo2.jpg"),
            () -> assertThat(result.photos().get(1).path()).endsWith(
                "/spaces/%s/guestbook/def.jpg".formatted(publicSpace.getCode())),

            () -> assertThat(result.photos().get(2).originalName()).isEqualTo("photo3.jpg"),
            () -> assertThat(result.photos().get(2).path()).endsWith(
                "/spaces/%s/guestbook/ghi.jpg".formatted(publicSpace.getCode()))
        );
    }

    @DisplayName("방문자 닉네임이 10자를 초과하면 예외를 던진다")
    @Test
    void throwExceptionWhenNicknameExceedMaxLength() {
        // given
        WriteGuestBookCardRequest request = new WriteGuestBookCardRequest(
            "12345678901",
            "message",
            List.of(
                new WriteGuestBookCardPhotoRequest("photo1.jpg", "abc.jpg", 1024L),
                new WriteGuestBookCardPhotoRequest("photo2.jpg", "def.jpg", 2048L),
                new WriteGuestBookCardPhotoRequest("photo3.jpg", "ghi.jpg", 4096L)
            )
        );

        // when, then
        RestAssuredMockMvc.given()
            .body(request)
            .contentType(ContentType.JSON)
            .accept(ContentType.JSON)
            .when()
            .post("/spaces/%s/guestbook".formatted(publicSpace.getCode()))
            .then()
            .statusCode(400)
            .body("message", containsString("방문자 닉네임은 최대 10자까지 입력 가능합니다."));
    }

    @DisplayName("방명록 카드 사진이 20개를 초과하면 예외를 던진다")
    @Test
    void throwExceptionWhenPhotoExceedMaxSize() {
        // given
        List<WriteGuestBookCardPhotoRequest> photos = IntStream.range(0, 21)
            .mapToObj(i -> new WriteGuestBookCardPhotoRequest("photo.jpg", "abc.jpg", 1024L))
            .toList();
        WriteGuestBookCardRequest request = new WriteGuestBookCardRequest(
            "nickname",
            "message",
            photos
        );

        // when, then
        RestAssuredMockMvc.given()
            .body(request)
            .contentType(ContentType.JSON)
            .accept(ContentType.JSON)
            .when()
            .post("/spaces/%s/guestbook".formatted(publicSpace.getCode()))
            .then()
            .statusCode(400)
            .body("message", containsString("방명록 카드 사진은 최대"));
    }

    @DisplayName("방명록 카드를 삭제한다")
    @Test
    void deleteCard() {
        // given
        WriteGuestBookCardResponse writeResponse = writeGuestBookCard(publicSpace);

        // when
        RestAssuredMockMvc.given()
            .when()
            .delete("/spaces/%s/guestbook/%d".formatted(publicSpace.getCode(), writeResponse.id()))
            .then()
            .statusCode(204);

        // then
        RestAssuredMockMvc.given()
            .accept(ContentType.JSON)
            .when()
            .get("/spaces/%s/guestbook/%d".formatted(publicSpace.getCode(), writeResponse.id()))
            .then()
            .statusCode(404);
    }

    @DisplayName("방명록 카드 사진을 일부 삭제한다")
    @Test
    void deleteCardPhotos() {
        // given
        WriteGuestBookCardResponse writeResponse = writeGuestBookCard(publicSpace);
        DeleteGuestBookCardPhotosRequest request = new DeleteGuestBookCardPhotosRequest(
            List.of(
                writeResponse.photos().get(0).id(),
                writeResponse.photos().get(2).id()
            )
        );

        // when
        RestAssuredMockMvc.given()
            .contentType(ContentType.JSON)
            .body(request)
            .when()
            .delete("/spaces/%s/guestbook/%d/photos".formatted(publicSpace.getCode(), writeResponse.id()))
            .then()
            .statusCode(204);

        // then
        GuestBookCardResponse response = RestAssuredMockMvc.given()
            .accept(ContentType.JSON)
            .when()
            .get("/spaces/%s/guestbook/%d".formatted(publicSpace.getCode(), writeResponse.id()))
            .then()
            .statusCode(200)
            .extract()
            .body()
            .as(GuestBookCardResponse.class);
        assertAll(
            () -> assertThat(response.photos()).size().isEqualTo(1),
            () -> assertThat(response.photos().getFirst().id()).isEqualTo(writeResponse.photos().get(1).id())
        );
    }

    private WriteGuestBookCardResponse writeGuestBookCard(Space space) {
        return RestAssuredMockMvc.given()
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
    }
}
