package com.forgather.domain.space.model;

import java.text.BreakIterator;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

import com.forgather.domain.model.BaseTimeEntity;
import com.forgather.global.auth.model.Host;
import com.forgather.global.auth.model.SpaceHostMap;
import com.forgather.global.exception.BaseException;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Space extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToMany(mappedBy = "space", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<SpaceHostMap> spaceHostMap = new ArrayList<>();

    @Column(name = "code", nullable = false, length = 64)
    private String code;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "description")
    private String description;

    @Column(name = "picture_url")
    private String pictureUrl;

    @Column(name = "is_public", nullable = false)
    private boolean isPublic;

    @Column(name = "instagram_username")
    private String instagramUsername;

    @Column(name = "email")
    private String email;

    public Space(Host host, String code, String name, String description, String pictureUrl, boolean isPublic,
        String instagramUsername, String email) {
        validate(code, name);
        spaceHostMap.add(new SpaceHostMap(this, host));
        this.code = code;
        this.name = name;
        this.description = description;
        this.pictureUrl = pictureUrl;
        this.isPublic = isPublic;
        this.instagramUsername = instagramUsername;
        this.email = email;
    }

    public void validateHost(Host host) {
        if (host == null) {
            throw new BaseException("호스트 정보가 없습니다.");
        }
        if (spaceHostMap.stream()
            .noneMatch(map -> Objects.equals(map.getHost().getId(), host.getId()))) {
            throw new BaseException("해당 호스트는 이 스페이스의 호스트가 아닙니다. hostId: " + host.getId() + ", spaceCode:" + code);
        }
    }

    public void update(String name, String description, String instagramUsername, String email) {
        if (name != null) {
            setName(name);
        }
        if (description != null) {
            setDescription(description);
        }
    }

    private void setName(String name) {
        if (name.isBlank() || getCharacterCount(name) > 10) {
            throw new BaseException("스페이스 이름은 비어있을 수 없고, 최대 10자여야 합니다. 생성 시도 이름: " + name);
        }
        this.name = name;
    }

    private void setDescription(String description) {
        if (description.length() > 200) {
            throw new BaseException("스페이스 설명은 최대 200자여야 합니다. 생성 시도 설명: " + description);
        }
        this.description = description;
    }

    private void validate(String code, String name) {
        if (code == null || code.length() != 10) {
            throw new BaseException("스페이스 코드는 10자리여야 합니다. 생성 시도 코드: " + code);
        }
        if (name == null || name.isBlank() || getCharacterCount(name) > 15) {
            throw new BaseException("스페이스 이름은 비어있을 수 없고, 최대 15자여야 합니다. 생성 시도 이름: " + name);
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
        if (getCharacterCount(name) > 15) {
            throw new BaseException("스페이스 이름은 15자를 초과할 수 없습니다. 생성 시도 이름: " + name);
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
