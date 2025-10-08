package com.forgather.domain.upload.domain;

import static com.forgather.domain.upload.domain.UploadCategory.PRODUCT;
import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatCode;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.junit.jupiter.api.Assertions.assertAll;

import java.util.List;
import java.util.Map;
import java.util.stream.IntStream;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import com.forgather.fake.FakeContentStorage;
import com.forgather.global.exception.BaseException;

class SignedUrlIssuerTest {

    @DisplayName("한 번에 발급 가능한 url 개수를 초과하면 예외를 던진다")
    @Test
    void throwExceptionWhenExceedMaxCount() {
        // given
        SignedUrlIssuer signedUrlIssuer = new SignedUrlIssuer(new FakeContentStorage());
        List<String> fileNames = IntStream.range(0, 101)
            .mapToObj(number -> number + ".jpg")
            .toList();

        // when, then
        assertThatThrownBy(() -> signedUrlIssuer.issueSignedUrls(fileNames, "1234567890", PRODUCT))
            .isInstanceOf(BaseException.class)
            .hasMessageContaining("한번에 발급 가능한 업로드 url 개수");
    }

    @DisplayName("한 번에 발급 가능한 url 개수를 초과하지 않으면 예외를 던지지 않는다")
    @Test
    void notThrowExceptionWhenNotExceedMaxCount() {
        // given
        SignedUrlIssuer signedUrlIssuer = new SignedUrlIssuer(new FakeContentStorage());
        List<String> fileNames = IntStream.range(0, 100)
            .mapToObj(number -> number + ".jpg")
            .toList();

        // when
        assertThatCode(() -> signedUrlIssuer.issueSignedUrls(fileNames, "1234567890", PRODUCT))
            .doesNotThrowAnyException();
    }

    @DisplayName("서명된 url을 발급한다")
    @Test
    void issueSignedUrls() {
        // given
        SignedUrlIssuer signedUrlIssuer = new SignedUrlIssuer(new FakeContentStorage());
        List<String> fileNames = List.of("abc.jpg", "def.jpg", "hij.png");

        // when
        Map<String, String> result = signedUrlIssuer.issueSignedUrls(
            fileNames,
            "1234567890",
            PRODUCT
        );

        // then
        assertAll(
            () -> assertThat(result.get("abc.jpg"))
                .isEqualTo("test-prefix-photogather/v2/spaces/1234567890/product/abc.jpg-test-suffix"),
            () -> assertThat(result.get("def.jpg"))
                .isEqualTo("test-prefix-photogather/v2/spaces/1234567890/product/def.jpg-test-suffix"),
            () -> assertThat(result.get("hij.png"))
                .isEqualTo("test-prefix-photogather/v2/spaces/1234567890/product/hij.png-test-suffix")
        );
    }
}
