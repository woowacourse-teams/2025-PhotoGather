-- 1. space
CREATE TABLE space
(
    id           BIGINT AUTO_INCREMENT PRIMARY KEY,
    code         VARCHAR(64)                        NOT NULL,
    name         VARCHAR(255) CHARACTER SET utf8mb4 NOT NULL,
    valid_hours  INT                                NOT NULL,
    opened_at    TIMESTAMP                          NOT NULL,
    max_capacity BIGINT                             NOT NULL DEFAULT 10737418240, -- 10GB default
    created_at   TIMESTAMP                          NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at   TIMESTAMP                          NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- 2. guest
CREATE TABLE guest
(
    id         BIGINT AUTO_INCREMENT PRIMARY KEY,
    space_id   BIGINT    NOT NULL,
    name       VARCHAR(100),
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT guest_space_fk FOREIGN KEY (space_id) REFERENCES space (id)
);


-- 3. space_content
CREATE TABLE space_content
(
    id           BIGINT AUTO_INCREMENT PRIMARY KEY,
    content_type VARCHAR(16) NOT NULL,
    space_id     BIGINT      NOT NULL,
    guest_id     BIGINT      NULL DEFAULT NULL,
    CONSTRAINT space_content_space_fk FOREIGN KEY (space_id) REFERENCES space (id),
    CONSTRAINT space_content_guest_fk FOREIGN KEY (guest_id) REFERENCES guest (id)
);

-- 4. photo
CREATE TABLE photo
(
    id            BIGINT       NOT NULL AUTO_INCREMENT,
    original_name VARCHAR(255) NOT NULL,
    path          VARCHAR(255) NOT NULL,
    captured_at   TIMESTAMP    NULL     DEFAULT NULL,
    capacity      BIGINT       NOT NULL,
    created_at    TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    CONSTRAINT photo_space_content_fk FOREIGN KEY (id) REFERENCES space_content (id)
);

-- 5. host
CREATE TABLE host
(
    id          BIGINT AUTO_INCREMENT PRIMARY KEY,
    name        VARCHAR(100),
    picture_url VARCHAR(255),
    created_at  TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at  TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- 6. space_host_map
CREATE TABLE space_host_map
(
    id         BIGINT    NOT NULL AUTO_INCREMENT,
    space_id   BIGINT    NOT NULL,
    host_id    BIGINT    NOT NULL,
    created_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    CONSTRAINT space_host_map_space_fk FOREIGN KEY (space_id) REFERENCES space (id),
    CONSTRAINT space_host_map_host_fk FOREIGN KEY (host_id) REFERENCES host (id)
);

-- 7. host_kakao
CREATE TABLE host_kakao
(
    id      BIGINT AUTO_INCREMENT PRIMARY KEY,
    host_id BIGINT       NOT NULL,
    user_id VARCHAR(100) NOT NULL,
    CONSTRAINT fk_host_kakao_host FOREIGN KEY (host_id) REFERENCES host (id)
);
