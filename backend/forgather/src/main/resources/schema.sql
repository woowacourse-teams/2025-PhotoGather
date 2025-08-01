-- 1. space
CREATE TABLE space
(
    id         BIGINT AUTO_INCREMENT PRIMARY KEY,
    space_code VARCHAR(64)                        NOT NULL,
    password   VARCHAR(64),
    name       VARCHAR(255) CHARACTER SET utf8mb4 NOT NULL,
    opened_at  TIMESTAMP                          NOT NULL,
    expired_at TIMESTAMP                          NOT NULL,
    created_at TIMESTAMP                          NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP                          NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- 2. space_content
CREATE TABLE space_content
(
    id           BIGINT AUTO_INCREMENT PRIMARY KEY,
    content_type VARCHAR(16) NOT NULL,
    space_id     BIGINT      NOT NULL,
    FOREIGN KEY (space_id) REFERENCES space (id)
);

-- 3. photo
CREATE TABLE photo
(
    id          BIGINT       NOT NULL AUTO_INCREMENT,
    path        VARCHAR(255) NOT NULL,
    captured_at TIMESTAMP    NULL     DEFAULT NULL,
    created_at  TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    CONSTRAINT photo_space_content_fk FOREIGN KEY (id) REFERENCES space_content (id)
);

-- 4. host
CREATE TABLE host
(
    id         BIGINT AUTO_INCREMENT PRIMARY KEY,
    name       VARCHAR(100),
    picture_url   VARCHAR(255),
    type       VARCHAR(16) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- 5. host_kakao
CREATE TABLE host_kakao
(
    id            BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id       VARCHAR(100) NOT NULL,
    access_token  VARCHAR(255),
    refresh_token VARCHAR(255),
    CONSTRAINT fk_host_kakao FOREIGN KEY (id) REFERENCES host (id)
);

-- 6. refresh_token
CREATE TABLE refresh_token
(
    id         BIGINT AUTO_INCREMENT PRIMARY KEY,
    host_id    BIGINT NOT NULL,
    token      VARCHAR(255) NOT NULL,
    expired_at TIMESTAMP NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_login_host FOREIGN KEY (host_id) REFERENCES host (id)
);
