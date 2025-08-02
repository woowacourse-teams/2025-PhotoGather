-- 1. space
CREATE TABLE space
(
    id         BIGINT AUTO_INCREMENT PRIMARY KEY,
    space_code VARCHAR(64)                        NOT NULL,
    password   VARCHAR(64),
    name       VARCHAR(255) CHARACTER SET utf8mb4 NOT NULL,
    valid_days INT                                NOT NULL,
    opened_at  TIMESTAMP                          NOT NULL,
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
    id            bigint       NOT NULL AUTO_INCREMENT,
    path          varchar(255) NOT NULL,
    captured_at   timestamp NULL DEFAULT NULL,
    created_at    timestamp    NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    CONSTRAINT photo_space_content_fk FOREIGN KEY (id) REFERENCES space_content (id)
);
