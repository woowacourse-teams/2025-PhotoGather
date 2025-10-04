package com.forgather.acceptance;

import static com.forgather.fixture.SpaceFixture.createSpace;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.containsString;
import static org.junit.jupiter.api.Assertions.assertAll;

import java.util.List;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.test.web.servlet.MockMvc;

import com.forgather.domain.product.dto.RegisterProductPhotoRequest;
import com.forgather.domain.product.dto.RegisterProductRequest;
import com.forgather.domain.product.dto.RegisterProductResponse;
import com.forgather.domain.space.model.Space;
import com.forgather.domain.space.repository.SpaceRepository;

import io.restassured.http.ContentType;
import io.restassured.module.mockmvc.RestAssuredMockMvc;

@AutoConfigureMockMvc
public class ProductAcceptanceTest extends AcceptanceTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private SpaceRepository spaceRepository;

    private Space space;

    @BeforeEach
    void setUp() {
        space = createSpace();
        spaceRepository.save(space);
    }

    @DisplayName("작품 등록")
    @Test
    public void registerProduct() {
        // given
        RegisterProductRequest request = new RegisterProductRequest(
            "title",
            "category",
            "authorName",
            "description",
            List.of(
                new RegisterProductPhotoRequest("photo1", "path1", 1024),
                new RegisterProductPhotoRequest("photo2", "path2", 2048),
                new RegisterProductPhotoRequest("photo3", "path3", 4096)
            )
        );

        // when
        RestAssuredMockMvc.mockMvc(mockMvc);
        RegisterProductResponse response = RestAssuredMockMvc.given()
            .body(request)
            .contentType(ContentType.JSON)
            .accept(ContentType.JSON)
            .when()
            .post("/spaces/%s/products".formatted(space.getCode()))
            .then()
            .extract()
            .body()
            .as(RegisterProductResponse.class);

        // then
        assertAll(
            () -> assertThat(response.id()).isNotNull(),
            () -> assertThat(response.title()).isEqualTo(request.title()),
            () -> assertThat(response.category()).isEqualTo(request.category()),
            () -> assertThat(response.authorName()).isEqualTo(request.authorName()),
            () -> assertThat(response.description()).isEqualTo(request.description()),
            () -> assertThat(response.photos().get(0).originalName()).isEqualTo("photo1"),
            () -> assertThat(response.photos().get(1).originalName()).isEqualTo("photo2"),
            () -> assertThat(response.photos().get(2).originalName()).isEqualTo("photo3")
        );
    }

    @DisplayName("중복 작품 등록 시 예외를 던진다")
    @Test
    public void throwExceptionWhenProductAlreadyExists() {
        // given
        RegisterProductRequest request = new RegisterProductRequest(
            "title",
            "category",
            "authorName",
            "description",
            List.of(
                new RegisterProductPhotoRequest("photo1", "path1", 1024),
                new RegisterProductPhotoRequest("photo2", "path2", 2048),
                new RegisterProductPhotoRequest("photo3", "path3", 4096)
            )
        );

        RestAssuredMockMvc.mockMvc(mockMvc);
        RestAssuredMockMvc.given()
            .body(request)
            .contentType(ContentType.JSON)
            .accept(ContentType.JSON)
            .when()
            .post("/spaces/%s/products".formatted(space.getCode()))
            .then()
            .statusCode(201);

        // when, then
        RestAssuredMockMvc.given()
            .body(request)
            .contentType(ContentType.JSON)
            .accept(ContentType.JSON)
            .when()
            .post("/spaces/%s/products".formatted(space.getCode()))
            .then()
            .statusCode(400)
            .body("message", containsString("이미 등록된"));
    }
}
