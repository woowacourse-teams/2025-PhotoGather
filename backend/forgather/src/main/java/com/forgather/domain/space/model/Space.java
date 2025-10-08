package com.forgather.domain.space.model;

import java.text.BreakIterator;
import java.util.Objects;

import com.forgather.domain.model.BaseTimeEntity;
import com.forgather.global.exception.BaseException;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;
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

    public Space(String code, String name, String description, boolean isPublic, String instagramUsername,
        String email) {
        validate(code, name, description, instagramUsername, email);
        this.code = code;
        this.name = name;
        this.description = description;
        this.isPublic = isPublic;
        this.instagramUsername = instagramUsername;
        this.email = email;
    }

    public void update(String name, String description, Boolean isPublic, String instagramUsername, String email) {
        if (name != null) {
            setName(name);
        }
        if (description != null) {
            setDescription(description);
        }
        if (instagramUsername != null) {
            setInstagramUsername(instagramUsername);
        }
        if (isPublic != null) {
            this.isPublic = isPublic;
        }
        if (email != null) {
            setEmail(email);
        }
    }

    private void setName(String name) {
        if (name == null || name.isBlank()) {
            throw new BaseException("스페이스 이름은 비어있을 수 없습니다." + name);
        }
        if (getCharacterCount(name) > MAX_NAME_LENGTH) {
            throw new BaseException(String.format("스페이스 이름은 최대 %d자까지 가능합니다. 생성 시도 이름: %s", MAX_NAME_LENGTH, name));
        }
        this.name = name;
    }

    private void setDescription(String description) {
        if (getCharacterCount(description) > MAX_DESCRIPTION_LENGTH) {
            throw new BaseException(String.format(
                "스페이스 설명은 최대 %d자까지 가능합니다. 생성 시도 설명: %s", MAX_DESCRIPTION_LENGTH, description)
            );
        }
        this.description = description;
    }

    private void setInstagramUsername(String instagramUsername) {
        if (instagramUsername.length() > MAX_INSTAGRAM_USERNAME_LENGTH) {
            throw new BaseException(String.format(
                "인스타그램 아이디는 최대 %d자까지 가능합니다. 생성 시도 아이디: %s", MAX_INSTAGRAM_USERNAME_LENGTH, instagramUsername)
            );
        }
        this.instagramUsername = instagramUsername;
    }

    private void setEmail(String email) {
        if (email.length() > MAX_EMAIL_LENGTH) {
            throw new BaseException(String.format("이메일은 최대 %d자까지 가능합니다. 생성 시도 이메일: %s", MAX_EMAIL_LENGTH, email));
        }
        this.email = email;
    }

    private void validate(String code, String name, String description, String instagramUsername, String email) {
        if (code == null || code.length() != CODE_LENGTH) {
            throw new BaseException("스페이스 코드는 10자리여야 합니다. 생성 시도 코드: " + code);
        }
        if (name == null || name.isBlank() || getCharacterCount(name) > MAX_NAME_LENGTH) {
            throw new BaseException("스페이스 이름은 비어있을 수 없고, 최대 15자여야 합니다. 생성 시도 이름: " + name);
        }
        if (description != null && getCharacterCount(description) > MAX_DESCRIPTION_LENGTH) {
            throw new BaseException(String.format(
                "스페이스 설명은 최대 %d자까지 가능합니다. 생성 시도 설명: %s", MAX_DESCRIPTION_LENGTH, description)
            );
        }
        if (instagramUsername != null && instagramUsername.length() > MAX_INSTAGRAM_USERNAME_LENGTH) {
            throw new BaseException(String.format(
                "인스타그램 아이디는 최대 %d자까지 가능합니다. 생성 시도 아이디: %s", MAX_INSTAGRAM_USERNAME_LENGTH, instagramUsername)
            );
        }
        if (email != null && email.length() > MAX_EMAIL_LENGTH) {
            throw new BaseException(String.format("이메일은 최대 %d자까지 가능합니다. 생성 시도 이메일: %s", MAX_EMAIL_LENGTH, email));
        }
    }

    @PrePersist
    @PreUpdate
    private void validateBeforeSave() {
        if (code == null || code.isBlank()) {
            throw new BaseException("스페이스 코드는 비어있을 수 없습니다. 생성 시도 코드: " + code);
        }
        if (name == null || name.isBlank()) {
            throw new BaseException("스페이스 이름은 비어있을 수 없습니다. 생성 시도 이름: " + name);
        }
        if (getCharacterCount(name) > MAX_NAME_LENGTH) {
            throw new BaseException(String.format("스페이스 이름은 %d자를 초과할 수 없습니다. 생성 시도 이름: %s", MAX_NAME_LENGTH, name));
        }
        if (description != null && getCharacterCount(description) > MAX_DESCRIPTION_LENGTH) {
            throw new BaseException(String.format(
                "스페이스 설명은 최대 %d자까지 가능합니다. 생성 시도 설명: %s", MAX_DESCRIPTION_LENGTH, description)
            );
        }
        if (instagramUsername != null && instagramUsername.length() > MAX_INSTAGRAM_USERNAME_LENGTH) {
            throw new BaseException(String.format(
                "인스타그램 아이디는 최대 %d자까지 가능합니다. 생성 시도 아이디: %s", MAX_INSTAGRAM_USERNAME_LENGTH, instagramUsername)
            );
        }
        if (email != null && email.length() > MAX_EMAIL_LENGTH) {
            throw new BaseException(String.format("이메일은 최대 %d자까지 가능합니다. 생성 시도 이메일: %s", MAX_EMAIL_LENGTH, email));
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

    public boolean isPublic() {
        return this.isPublic;
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
