package com.forgather.domain.space.model;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

import com.forgather.domain.model.BaseTimeEntity;
import com.forgather.global.auth.model.Host;
import com.forgather.global.auth.model.SpaceHostMap;
import com.forgather.global.exception.ForbiddenException;

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

    @OneToMany(mappedBy = "space", cascade = CascadeType.ALL)
    private List<SpaceHostMap> spaceHostMap = new ArrayList<>();

    @Column(name = "code", nullable = false, length = 64)
    private String code;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "valid_hours", nullable = false)
    private int validHours;

    @Column(name = "opened_at", nullable = false)
    private LocalDateTime openedAt;

    public Space(Host host, String code, String name, int validHours, LocalDateTime openedAt) {
        validate(code, name, validHours, openedAt);
        spaceHostMap.add(new SpaceHostMap(this, host));
        this.code = code;
        this.name = name;
        this.openedAt = openedAt;
        this.validHours = validHours;
    }

    public void validateExpiration(LocalDateTime currentDateTime) {
        LocalDateTime expiredAt = openedAt.plusHours(validHours);
        if (expiredAt.isBefore(currentDateTime)) {
            throw new IllegalArgumentException("만료된 스페이스입니다. code: " + code);
        }
    }

    public void validateHost(Host host) {
        if (host == null) {
            throw new IllegalArgumentException("호스트 정보가 없습니다.");
        }
        if (spaceHostMap.stream()
            .noneMatch(map -> Objects.equals(map.getHost().getId(), host.getId()))) {
            throw new ForbiddenException(
                "해당 호스트는 이 스페이스의 호스트가 아닙니다. host id: " + host.getId() + ", spaceCode:" + code);
        }
    }

    public boolean isExpired(LocalDateTime now) {
        return getExpiredAt().isBefore(now);
    }

    public boolean isOpened(LocalDateTime now) {
        return openedAt.isBefore(now);
    }

    public LocalDateTime getExpiredAt() {
        return openedAt.plusHours(validHours);
    }

    public void update(String name, Integer validHours, LocalDateTime openedAt, String password) {
        if (name != null) {
            setName(name);
        }
        if (validHours != null) {
            setValidHours(validHours);
        }
        if (openedAt != null) {
            setOpenedAt(openedAt);
        }
    }

    private void setName(String name) {
        if (name.isBlank() || name.length() > 10) {
            throw new IllegalArgumentException("스페이스 이름은 비어있을 수 없고, 최대 10자여야 합니다. 생성 시도 이름: " + name);
        }
        this.name = name;
    }

    private void setValidHours(Integer validHours) {
        if (validHours <= 0) {
            throw new IllegalArgumentException("스페이스 유효 시간은 1시간 이상이어야 합니다. 생성 시도 유효 시간: " + validHours);
        }
        this.validHours = validHours;
    }

    private void setOpenedAt(LocalDateTime newOpenedAt) {
        validateOpenedAt(newOpenedAt);
        if (isExpired(LocalDateTime.now())) {
            throw new IllegalArgumentException("만료된 스페이스의 오픈 시각을 변경할 수 없습니다.");
        }
        if (isOpened(LocalDateTime.now())) {
            throw new IllegalArgumentException("이미 열린 스페이스의 오픈 시각을 변경할 수 없습니다.");
        }
        this.openedAt = newOpenedAt;
    }

    private void validate(String code, String name, int validHours, LocalDateTime openedAt) {
        if (code == null || code.length() != 10) {
            throw new IllegalArgumentException("스페이스 코드는 10자리여야 합니다. 생성 시도 코드: " + code);
        }
        if (name == null || name.isBlank() || name.length() > 10) {
            throw new IllegalArgumentException("스페이스 이름은 비어있을 수 없고, 최대 10자여야 합니다. 생성 시도 이름: " + name);
        }
        if (validHours <= 0) {
            throw new IllegalArgumentException("스페이스 유효 시간은 1시간 이상이어야 합니다. 생성 시도 유효 시간: " + validHours);
        }
        validateOpenedAt(openedAt);
    }

    private void validateOpenedAt(LocalDateTime openedAt) {
        if (openedAt == null) {
            throw new IllegalArgumentException("스페이스 오픈 시각은 비어있을 수 없습니다.");
        }
        // 네트워크 지연 고려해서 1시간 과거 생성까지는 허용
        if (openedAt.isBefore(LocalDateTime.now().minusHours(1L))) {
            throw new IllegalArgumentException("스페이스 오픈 시각은 현재 시각 이후여야 합니다. 생성 시도 시각: " + openedAt);
        }
    }

    @PrePersist
    @PreUpdate
    private void validateBeforeSave() {
        if (code == null || code.isBlank()) {
            throw new IllegalArgumentException("스페이스 코드는 비어있을 수 없습니다. 생성 시도 코드: " + code);
        }
        if (name == null || name.isBlank()) {
            throw new IllegalArgumentException("스페이스 이름은 비어있을 수 없습니다. 생성 시도 이름: " + name);
        }
        if (openedAt == null) {
            throw new IllegalArgumentException("스페이스 오픈 시각은 비어있을 수 없습니다.");
        }
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
