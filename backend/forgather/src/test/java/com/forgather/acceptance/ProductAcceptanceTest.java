package com.forgather.acceptance;

import static com.forgather.fixture.SpaceFixture.createSpace;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.containsString;
import static org.junit.jupiter.api.Assertions.assertAll;

import java.util.List;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;

import com.forgather.domain.product.dto.ProductResponse;
import com.forgather.domain.product.dto.RegisterProductPhotoRequest;
import com.forgather.domain.product.dto.RegisterProductRequest;
import com.forgather.domain.product.dto.UpdateProductRequest;
import com.forgather.domain.product.repository.ProductRepository;
import com.forgather.domain.space.model.Space;
import com.forgather.domain.space.repository.SpaceRepository;
import com.forgather.domain.upload.AwsS3Cloud;

import io.restassured.http.ContentType;
import io.restassured.module.mockmvc.RestAssuredMockMvc;

@AutoConfigureMockMvc
public class ProductAcceptanceTest extends AcceptanceTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private SpaceRepository spaceRepository;

    @Autowired
    private ProductRepository productRepository;

    @MockitoBean
    private AwsS3Cloud awsS3Cloud;

    private Space space;

    private RegisterProductRequest registerRequest = new RegisterProductRequest(
        "title",
        "category",
        "authorName",
        "description",
        List.of(
            new RegisterProductPhotoRequest("photo1", "path1", 1024L),
            new RegisterProductPhotoRequest("photo2", "path2", 2048L),
            new RegisterProductPhotoRequest("photo3", "path3", 4096L)
        )
    );

    @BeforeEach
    void setUp() {
        space = createSpace();
        spaceRepository.save(space);
        RestAssuredMockMvc.mockMvc(mockMvc);
    }

    @DisplayName("작품 조회")
    @Test
    public void get() {
        // given
        ProductResponse registerResponse = registerProduct();

        // when
        ProductResponse result = RestAssuredMockMvc.given()
            .accept(ContentType.JSON)
            .when()
            .get("/spaces/%s/products".formatted(space.getCode()))
            .then()
            .statusCode(200)
            .extract()
            .body()
            .as(ProductResponse.class);

        // then
        assertAll(
            () -> assertThat(result.id()).isNotNull(),
            () -> assertThat(result.title()).isEqualTo(registerResponse.title()),
            () -> assertThat(result.category()).isEqualTo(registerResponse.category()),
            () -> assertThat(result.authorName()).isEqualTo(registerResponse.authorName()),
            () -> assertThat(result.description()).isEqualTo(registerResponse.description()),
            () -> assertThat(result.photos().get(0).originalName()).isEqualTo("photo1"),
            () -> assertThat(result.photos().get(0).order()).isEqualTo(1),
            () -> assertThat(result.photos().get(1).originalName()).isEqualTo("photo2"),
            () -> assertThat(result.photos().get(1).order()).isEqualTo(2),
            () -> assertThat(result.photos().get(2).originalName()).isEqualTo("photo3"),
            () -> assertThat(result.photos().get(2).order()).isEqualTo(3)
        );
    }

    @DisplayName("작품 조회 시 등록된 작품이 없으면 예외를 던진다")
    @Test
    public void throwExceptionWhenNoProducts() {
        // when, then
        RestAssuredMockMvc.given()
            .accept(ContentType.JSON)
            .when()
            .get("/spaces/%s/products".formatted(space.getCode()))
            .then()
            .statusCode(404)
            .body("message", containsString("등록된 작품이"));
    }

    @DisplayName("작품 등록")
    @Test
    public void register() {
        // when
        ProductResponse response = RestAssuredMockMvc.given()
            .body(registerRequest)
            .contentType(ContentType.JSON)
            .accept(ContentType.JSON)
            .when()
            .post("/spaces/%s/products".formatted(space.getCode()))
            .then()
            .statusCode(201)
            .extract()
            .body()
            .as(ProductResponse.class);

        // then
        assertAll(
            () -> assertThat(response.id()).isNotNull(),
            () -> assertThat(response.title()).isEqualTo(registerRequest.title()),
            () -> assertThat(response.category()).isEqualTo(registerRequest.category()),
            () -> assertThat(response.authorName()).isEqualTo(registerRequest.authorName()),
            () -> assertThat(response.description()).isEqualTo(registerRequest.description()),
            () -> assertThat(response.photos().get(0).originalName()).isEqualTo("photo1"),
            () -> assertThat(response.photos().get(0).order()).isEqualTo(1),
            () -> assertThat(response.photos().get(1).originalName()).isEqualTo("photo2"),
            () -> assertThat(response.photos().get(1).order()).isEqualTo(2),
            () -> assertThat(response.photos().get(2).originalName()).isEqualTo("photo3"),
            () -> assertThat(response.photos().get(2).order()).isEqualTo(3)
        );
    }

    @DisplayName("중복 작품 등록 시 예외를 던진다")
    @Test
    public void throwExceptionWhenProductAlreadyExists() {
        // given
        registerProduct();

        // when, then
        RestAssuredMockMvc.given()
            .body(registerRequest)
            .contentType(ContentType.JSON)
            .accept(ContentType.JSON)
            .when()
            .post("/spaces/%s/products".formatted(space.getCode()))
            .then()
            .statusCode(400)
            .body("message", containsString("이미 등록된"));
    }

    @DisplayName("작품 정보 수정")
    @Test
    public void update() {
        // given
        ProductResponse registerResponse = registerProduct();
        Mockito.doNothing().when(awsS3Cloud).deleteContents(Mockito.anyList());

        // when
        UpdateProductRequest request = new UpdateProductRequest(
            "foovar1",
            null,
            null,
            "description",
            List.of(2L),
            List.of(
                new RegisterProductPhotoRequest("photo4", "path4", 1024L),
                new RegisterProductPhotoRequest("photo5", "path5", 1024L)
            )
        );

        ProductResponse result = RestAssuredMockMvc.given()
            .body(request)
            .contentType(ContentType.JSON)
            .accept(ContentType.JSON)
            .when()
            .patch("/spaces/%s/products".formatted(space.getCode()))
            .then()
            .statusCode(200)
            .extract()
            .body()
            .as(ProductResponse.class);

        // then
        assertAll(
            () -> assertThat(result.id()).isNotNull(),
            () -> assertThat(result.title()).isEqualTo(request.title()),
            () -> assertThat(result.category()).isEqualTo(registerResponse.category()),
            () -> assertThat(result.authorName()).isEqualTo(registerResponse.authorName()),
            () -> assertThat(result.description()).isEqualTo(request.description()),
            () -> assertThat(result.photos().get(0).originalName()).isEqualTo("photo1"),
            () -> assertThat(result.photos().get(0).order()).isEqualTo(1),
            () -> assertThat(result.photos().get(1).originalName()).isEqualTo("photo3"),
            () -> assertThat(result.photos().get(1).order()).isEqualTo(2),
            () -> assertThat(result.photos().get(2).originalName()).isEqualTo("photo4"),
            () -> assertThat(result.photos().get(2).order()).isEqualTo(3),
            () -> assertThat(result.photos().get(3).originalName()).isEqualTo("photo5"),
            () -> assertThat(result.photos().get(3).order()).isEqualTo(4)
        );
    }

    @DisplayName("작품 삭제")
    @Test
    public void delete() {
        // given
        registerProduct();
        Mockito.doNothing().when(awsS3Cloud).deleteContents(Mockito.anyList());

        // when, then
        RestAssuredMockMvc
            .when()
            .delete("/spaces/%s/products".formatted(space.getCode()))
            .then()
            .statusCode(204);
        assertThat(productRepository.findBySpaceCode(space.getCode())).isEmpty();
    }

    private ProductResponse registerProduct() {
        return RestAssuredMockMvc.given()
            .body(registerRequest)
            .contentType(ContentType.JSON)
            .accept(ContentType.JSON)
            .when()
            .post("/spaces/%s/products".formatted(space.getCode()))
            .then()
            .statusCode(201)
            .extract()
            .body()
            .as(ProductResponse.class);
    }
}
