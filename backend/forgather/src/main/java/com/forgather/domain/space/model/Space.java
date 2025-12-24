package com.forgather.domain.space.model;

import java.util.Objects;
import java.util.regex.Pattern;

import org.springframework.http.HttpStatus;

import com.forgather.domain.model.SoftDeleteEntity;
import com.forgather.global.exception.BaseException;
import com.forgather.global.exception.BaseNullPointerException;
import com.forgather.global.util.TextLengthCounter;

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
public class Space extends SoftDeleteEntity {

    private static final int CODE_LENGTH = 10;
    private static final int MAX_NAME_LENGTH = 30;
    private static final int MAX_DESCRIPTION_LENGTH = 200;
    private static final int MAX_INSTAGRAM_USERNAME_LENGTH = 30;
    private static final int MAX_EMAIL_LENGTH = 50;
    private static final Pattern EMAIL_PATTERN = Pattern.compile(
        "^[a-zA-Z0-9_+&*-]+(?:\\.[a-zA-Z0-9_+&*-]+)*@(?:[a-zA-Z0-9-]+\\.)+[a-zA-Z]{2,63}$"
    );

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "code", nullable = false, length = 64)
    private String code;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "description", nullable = false)
    private String description;

    @Column(name = "is_public", nullable = false)
    private boolean isPublic = false;

    @Column(name = "instagram_username", nullable = false)
    private String instagramUsername;

    @Column(name = "email", nullable = false)
    private String email;

    /**
     * 스페이스를 생성한다.
     *
     * @param code              스페이스 코드 (필수, 10자)
     * @param name              스페이스 이름 (필수, 최대 30자)
     * @param description       스페이스 설명 (필수, 최대 200자)
     * @param isPublic          스페이스 공개 여부 (필수)
     * @param instagramUsername 인스타그램 아이디 (필수, 최대 30자)
     * @param email             이메일 (필수, 최대 50자)
     */
    public Space(String code, String name, String description, boolean isPublic, String instagramUsername,
        String email) {
        validateRequiredFields(code, name, description, instagramUsername, email);
        validateCode(code);
        validateName(name);
        validateDescription(description);
        validateInstagramUsername(instagramUsername);
        validateEmail(email);
        this.code = code;
        this.name = name;
        this.description = convertBlankToEmptyString(description);
        this.isPublic = isPublic;
        this.instagramUsername = convertBlankToEmptyString(instagramUsername);
        this.email = convertBlankToEmptyString(email);
    }

    private void validateRequiredFields(String code, String name, String description, String instagramUsername,
        String email) {
        if (code == null) {
            throw new BaseNullPointerException("스페이스 코드는 null일 수 없습니다.", HttpStatus.BAD_REQUEST);
        }
        if (name == null) {
            throw new BaseNullPointerException("스페이스 이름은 null일 수 없습니다.", HttpStatus.BAD_REQUEST);
        }
        if (description == null) {
            throw new BaseNullPointerException("스페이스 설명은 null일 수 없습니다.", HttpStatus.BAD_REQUEST);
        }
        if (instagramUsername == null) {
            throw new BaseNullPointerException("인스타그램 아이디는 null일 수 없습니다.", HttpStatus.BAD_REQUEST);
        }
        if (email == null) {
            throw new BaseNullPointerException("이메일은 null일 수 없습니다.", HttpStatus.BAD_REQUEST);
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
        if (TextLengthCounter.count(name) > MAX_NAME_LENGTH) {
            throw new BaseException("스페이스 이름은 최대 %d자까지 가능합니다.".formatted(MAX_NAME_LENGTH));
        }
    }

    private void validateDescription(String description) {
        if (TextLengthCounter.count(description) > MAX_DESCRIPTION_LENGTH) {
            throw new BaseException("스페이스 설명은 최대 %d자까지 가능합니다.".formatted(MAX_DESCRIPTION_LENGTH));
        }
    }

    private void validateInstagramUsername(String instagramUsername) {
        if (instagramUsername.length() > MAX_INSTAGRAM_USERNAME_LENGTH) {
            throw new BaseException("인스타그램 아이디는 최대 %d자까지 가능합니다.".formatted(MAX_INSTAGRAM_USERNAME_LENGTH));
        }
    }

    private void validateEmail(String email) {
        if (email.isBlank()) {
            return;
        }
        if (email.length() > MAX_EMAIL_LENGTH) {
            throw new BaseException("이메일은 최대 %d자까지 가능합니다.".formatted(MAX_EMAIL_LENGTH));
        }
        if (!EMAIL_PATTERN.matcher(email).matches()) {
            throw new BaseException("이메일 형식이 올바르지 않습니다.");
        }
    }

    private String convertBlankToEmptyString(String string) {
        if (string.isBlank()) {
            return "";
        }
        return string;
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
