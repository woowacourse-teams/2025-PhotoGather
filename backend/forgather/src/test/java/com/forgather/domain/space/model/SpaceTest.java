package com.forgather.domain.space.model;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatCode;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.junit.jupiter.api.Assertions.assertAll;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.NullAndEmptySource;
import org.junit.jupiter.params.provider.ValueSource;

import com.forgather.global.exception.BaseException;
import com.forgather.global.exception.BaseNullPointerException;

class SpaceTest {

    @DisplayName("스페이스 생성에 코드와 이름은 필수값이다.")
    @Test
    void createSpaceWithRequiredFields() {
        // given
        String spaceCode = "1234567890";
        String name = "나의 졸업전시";

        // when & then
        assertThatCode(
            () -> new Space(spaceCode, name, "", false, "", "")
        ).doesNotThrowAnyException();
    }

    @DisplayName("설명, 인스타그램 아이디, 이메일은 공백인 경우 빈 문자열로 저장한다.")
    @Test
    void createSpaceWithBlank() {
        // given
        String description = "  ";
        String instagramUsername = "  ";
        String email = "  ";

        // when
        Space space = new Space("1234567890", "나의 졸업전시", description, false, instagramUsername, email);

        // then
        assertAll(
            () -> assertThat(space.getDescription()).isEmpty(),
            () -> assertThat(space.getInstagramUsername()).isEmpty(),
            () -> assertThat(space.getEmail()).isEmpty()
        );
    }

    @DisplayName("스페이스 코드가 존재하지 않으면 스페이스를 생성할 수 없다.")
    @Test
    void createSpaceWithoutCode() {
        // given
        String name = "나의 졸업전시";

        // when & then
        assertThatThrownBy(
            () -> new Space(null, name, null, false, null, null)
        ).isInstanceOf(BaseNullPointerException.class)
            .hasMessageContaining("스페이스 코드");
    }

    @DisplayName("스페이스 이름이 존재하지 않으면 스페이스를 생성할 수 없다.")
    @Test
    void createSpaceWithoutName() {
        // given
        String code = "1234567890";

        // when & then
        assertThatThrownBy(
            () -> new Space(code, null, null, false, null, null)
        ).isInstanceOf(BaseNullPointerException.class)
            .hasMessageContaining("스페이스 이름");
    }

    @DisplayName("스페이스 이름 이모지 1글자 처리")
    @Test
    void createSpaceWithEmoji() {
        // given
        String spaceCode = "1234567890";
        String emoji = "\uD83D\uDC68\u200D\uD83D\uDC69\u200D\uD83D\uDC67\u200D\uD83D\uDC66"; // // 가족 이모지, length 11
        String name = "우리의 모임12345678" + emoji; // 스페이스 이름에 이모지 포함
        String description = "스페이스 설명";
        String instagramUsername = "forgather_official";
        String email = "forgather@forgather.me";

        // when & then
        assertThatCode(
            () -> new Space(spaceCode, name, description, false, instagramUsername, email)
        ).doesNotThrowAnyException();
    }

    @DisplayName("스페이스 이름이 비어있거나, 15자 초과면 예외를 던진다")
    @NullAndEmptySource
    @ParameterizedTest
    @ValueSource(strings = {" ", "abcde12345678901"})
    void spaceNameValidationTest(String invalidName) {
        // given
        String description = "스페이스 설명";
        String instagramUsername = "forgather_official";
        String email = "forgather@forgather.me";

        // when & then
        assertThatThrownBy(
            () -> new Space("1234567890", invalidName, description, false, instagramUsername, email)
        ).isInstanceOf(BaseException.class)
            .hasMessageContaining("스페이스 이름");
    }

    @DisplayName("스페이스 코드는 10자리여야 한다")
    @Test
    void spaceCodeValidationTest() {
        // given
        String name = "스페이스";
        String description = "스페이스 설명";
        String instagramUsername = "forgather_official";
        String email = "forgather@forgather.me";

        // when & then
        assertThatThrownBy(
            () -> new Space("123456789", name, description, false, instagramUsername, email)
        ).isInstanceOf(BaseException.class)
            .hasMessageContaining("스페이스 코드");
    }

    @DisplayName("스페이스 설명은 최대 200자까지 가능하다.")
    @Test
    void spaceDescriptionValidationTest() {
        // given
        String name = "스페이스";
        String description = getString(201); // 201자
        String instagramUsername = "forgather_official";
        String email = "forgather@forgather.me";

        // when & then
        assertThatThrownBy(() -> new Space("1234567890", name, description, false, instagramUsername, email))
            .isInstanceOf(BaseException.class)
            .hasMessageContaining("스페이스 설명");
    }

    @DisplayName("인스타그램 아이디는 최대 30자까지 가능하다.")
    @Test
    void spaceInstagramUsernameValidationTest() {
        // given
        String name = "스페이스";
        String description = "스페이스 설명";
        String instagramUsername = getString(31);
        String email = "forgather@forgather.me";

        // when & then
        assertThatThrownBy(() -> new Space("1234567890", name, description, false, instagramUsername, email))
            .isInstanceOf(BaseException.class)
            .hasMessageContaining("인스타그램 아이디");
    }

    @DisplayName("이메일은 최대 50자까지 가능하다.")
    @Test
    void spaceEmailValidationTest() {
        // given
        String name = "스페이스";
        String description = "스페이스 설명";
        String instagramUsername = "forgather_official";
        String email = getString(51);

        // when & then
        assertThatThrownBy(() -> new Space("1234567890", name, description, false, instagramUsername, email))
            .isInstanceOf(BaseException.class)
            .hasMessageContaining("이메일");
    }

    @DisplayName("이메일은 올바른 형식을 따라야한다.")
    @ValueSource(strings = {"invalid", "@invalid.com", "@", "invalid@invalid"})
    @ParameterizedTest
    void spaceEmailPatternValidationTest(String email) {
        // given
        String name = "스페이스";
        String description = "스페이스 설명";
        String instagramUsername = "forgather_official";

        // when & then
        assertThatThrownBy(() -> new Space("1234567890", name, description, false, instagramUsername, email))
            .isInstanceOf(BaseException.class)
            .hasMessageContaining("이메일 형식");
    }

    @DisplayName("스페이스 이름을 수정할 수 있다.")
    @Test
    void updateSpaceName() {
        // given
        Space space = new Space("1234567890", "스페이스", "스페이스 설명", false, "forgather_official",
            "forgather@forgather.me");

        // when
        space.update("새로운 스페이스", null, null, null, null);

        // then
        assertAll(
            () -> assertThat(space.getName()).isEqualTo("새로운 스페이스"),
            () -> assertThat(space.getDescription()).isEqualTo("스페이스 설명"),
            () -> assertThat(space.isPublic()).isFalse(),
            () -> assertThat(space.getInstagramUsername()).isEqualTo("forgather_official"),
            () -> assertThat(space.getEmail()).isEqualTo("forgather@forgather.me")
        );
    }

    @DisplayName("스페이스 설명을 수정할 수 있다.")
    @Test
    void updateSpaceDescription() {
        // given
        Space space = new Space("1234567890", "스페이스", "스페이스 설명", false, "forgather_official",
            "forgather@forgather.me");

        // when
        space.update(null, "새로운 스페이스 설명", null, null, null);

        // then
        assertAll(
            () -> assertThat(space.getName()).isEqualTo("스페이스"),
            () -> assertThat(space.getDescription()).isEqualTo("새로운 스페이스 설명"),
            () -> assertThat(space.isPublic()).isFalse(),
            () -> assertThat(space.getInstagramUsername()).isEqualTo("forgather_official"),
            () -> assertThat(space.getEmail()).isEqualTo("forgather@forgather.me")
        );
    }

    @DisplayName("스페이스 공개 여부를 수정할 수 있다.")
    @Test
    void updateSpaceIsPublic() {
        // given
        Space space = new Space("1234567890", "스페이스", "스페이스 설명", false, "forgather_official",
            "forgather@forgather.me");

        // when
        space.update(null, null, true, null, null);

        // then
        assertAll(
            () -> assertThat(space.getName()).isEqualTo("스페이스"),
            () -> assertThat(space.getDescription()).isEqualTo("스페이스 설명"),
            () -> assertThat(space.isPublic()).isTrue(),
            () -> assertThat(space.getInstagramUsername()).isEqualTo("forgather_official"),
            () -> assertThat(space.getEmail()).isEqualTo("forgather@forgather.me")
        );
    }

    @DisplayName("스페이스 인스타그램 아이디를 수정할 수 있다.")
    @Test
    void updateSpaceInstagramUsername() {
        // given
        Space space = new Space("1234567890", "스페이스", "스페이스 설명", false, "forgather_official",
            "forgather@forgather.me");

        // when
        space.update(null, null, null, "forgather_official_new", null);

        // then
        assertAll(
            () -> assertThat(space.getName()).isEqualTo("스페이스"),
            () -> assertThat(space.getDescription()).isEqualTo("스페이스 설명"),
            () -> assertThat(space.isPublic()).isFalse(),
            () -> assertThat(space.getInstagramUsername()).isEqualTo("forgather_official_new"),
            () -> assertThat(space.getEmail()).isEqualTo("forgather@forgather.me")
        );
    }

    @DisplayName("스페이스 이메일을 수정할 수 있다.")
    @Test
    void updateSpaceEmail() {
        // given
        Space space = new Space("1234567890", "스페이스", "스페이스 설명", false, "forgather_official",
            "forgather@forgather.me");

        // when
        space.update(null, null, null, null, "forgather_new@forgather.me");

        // then
        assertAll(
            () -> assertThat(space.getName()).isEqualTo("스페이스"),
            () -> assertThat(space.getDescription()).isEqualTo("스페이스 설명"),
            () -> assertThat(space.isPublic()).isFalse(),
            () -> assertThat(space.getInstagramUsername()).isEqualTo("forgather_official"),
            () -> assertThat(space.getEmail()).isEqualTo("forgather_new@forgather.me")
        );
    }

    private String getString(int length) {
        return "a".repeat(Math.max(0, length));
    }
}
