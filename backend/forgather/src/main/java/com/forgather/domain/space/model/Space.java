package com.forgather.domain.space.model;

import java.text.BreakIterator;
import java.util.Objects;
import java.util.regex.Pattern;

import com.forgather.domain.model.BaseTimeEntity;
import com.forgather.global.exception.BaseException;
import com.forgather.global.exception.BaseNullPointerException;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Space extends BaseTimeEntity {

    private static final int CODE_LENGTH = 10;
    private static final int MAX_NAME_LENGTH = 15;
    private static final int MAX_DESCRIPTION_LENGTH = 200;
    private static final int MAX_INSTAGRAM_USERNAME_LENGTH = 30;
    private static final int MAX_EMAIL_LENGTH = 50;
    private static final Pattern EMAIL_PATTERN = Pattern.compile(
        "^[a-zA-Z0-9_+&*-]+(?:\\.[a-zA-Z0-9_+&*-]+)*@(?:[a-zA-Z0-9-]+\\.)+[a-zA-Z]{2,7}$"
    );

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "code", nullable = false, length = 64)
    private String code;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "description")
    private String description;

    @Column(name = "is_public", nullable = false)
    private boolean isPublic = false;

    @Column(name = "instagram_username")
    private String instagramUsername;

    @Column(name = "email")
    private String email;

    /**
     * 스페이스를 생성한다.
     *
     * @param code              스페이스 코드 (필수, 10자)
     * @param name              스페이스 이름 (필수, 최대 15자)
     * @param description       스페이스 설명 (선택, 최대 200자)
     * @param isPublic          스페이스 공개 여부 (필수)
     * @param instagramUsername 인스타그램 아이디 (선택, 최대 30자)
     * @param email             이메일 (선택, 최대 50자)
     */
    public Space(String code, String name, String description, boolean isPublic, String instagramUsername,
        String email) {
        validateRequiredFields(code, name);
        validateCode(code);
        validateName(name);
        validateDescription(description);
        validateInstagramUsername(instagramUsername);
        validateEmail(email);
        this.code = code;
        this.name = name;
        this.description = description;
        this.isPublic = isPublic;
        this.instagramUsername = instagramUsername;
        this.email = email;
    }

    private void validateRequiredFields(String code, String name) {
        if (code == null) {
            throw new BaseNullPointerException("스페이스 코드는 필수입니다.");
        }
        if (name == null) {
            throw new BaseNullPointerException("스페이스 이름은 필수입니다.");
        }
    }

    public void update(String name, String description, Boolean isPublic, String instagramUsername, String email) {
        if (name != null) {
            validateName(name);
            this.name = name;
        }
        if (description != null) {
            validateDescription(description);
            this.description = description;
        }
        if (instagramUsername != null) {
            validateInstagramUsername(instagramUsername);
            this.instagramUsername = instagramUsername;
        }
        if (isPublic != null) {
            this.isPublic = isPublic;
        }
        if (email != null) {
            validateEmail(email);
            this.email = email;
        }
    }

    private void validateCode(String code) {
        if (code.length() != CODE_LENGTH) {
            throw new BaseException("스페이스 코드는 %d자여야 합니다.".formatted(CODE_LENGTH));
        }
    }

    private void validateName(String name) {
        if (name.isBlank()) {
            throw new BaseException("스페이스 이름은 공백만 입력할 수 없습니다.");
        }
        if (getCharacterCount(name) > MAX_NAME_LENGTH) {
            throw new BaseException("스페이스 이름은 최대 %d자까지 가능합니다.".formatted(MAX_NAME_LENGTH));
        }
    }

    private void validateDescription(String description) {
        if (description == null || description.isBlank()) {
            return;
        }
        if (getCharacterCount(description) > MAX_DESCRIPTION_LENGTH) {
            throw new BaseException("스페이스 설명은 최대 %d자까지 가능합니다.".formatted(MAX_DESCRIPTION_LENGTH));
        }
    }

    private void validateInstagramUsername(String instagramUsername) {
        if (instagramUsername == null || instagramUsername.isBlank()) {
            return;
        }
        if (instagramUsername.length() > MAX_INSTAGRAM_USERNAME_LENGTH) {
            throw new BaseException("인스타그램 아이디는 최대 %d자까지 가능합니다.".formatted(MAX_INSTAGRAM_USERNAME_LENGTH));
        }
    }

    private void validateEmail(String email) {
        if (email == null || email.isBlank()) {
            return;
        }
        if (email.length() > MAX_EMAIL_LENGTH) {
            throw new BaseException("이메일은 최대 %d자까지 가능합니다.".formatted(MAX_EMAIL_LENGTH));
        }
        if (!EMAIL_PATTERN.matcher(email).matches()) {
            throw new BaseException("이메일 형식이 올바르지 않습니다.");
        }
    }

    // 이모지의 길이를 1로 처리
    private int getCharacterCount(String text) {
        BreakIterator iterator = BreakIterator.getCharacterInstance();
        iterator.setText(text);
        int count = 0;
        while (iterator.next() != BreakIterator.DONE) {
            count++;
        }
        return count;
    }

    @Override
    public boolean equals(Object object) {
        if (object == null || getClass() != object.getClass())
            return false;
        Space space = (Space)object;
        return Objects.equals(id, space.id);
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }
}
