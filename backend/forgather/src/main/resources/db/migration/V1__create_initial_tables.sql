CREATE TABLE `guest`
(
    `id`         BIGINT       NOT NULL AUTO_INCREMENT,
    `nickname`   VARCHAR(255) NOT NULL,
    `created_at` TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`)
);

CREATE TABLE `host`
(
    `id`           BIGINT    NOT NULL AUTO_INCREMENT,
    `name`         VARCHAR(255) NULL,
    `picture_url`  VARCHAR(255) NULL,
    `agreed_terms` TINYINT(1) NOT NULL DEFAULT 0,
    `created_at`   TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at`   TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`)
);

CREATE TABLE `space`
(
    `id`                 BIGINT       NOT NULL AUTO_INCREMENT,
    `code`               VARCHAR(64)  NOT NULL,
    `name`               VARCHAR(255) NOT NULL,
    `description`        VARCHAR(255) NULL,
    `is_public`          TINYINT(1)	NOT NULL DEFAULT 0,
    `instagram_username` VARCHAR(255) NULL,
    `email`              VARCHAR(255) NULL,
    `created_at`         TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at`         TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`)
);

CREATE TABLE `space_host_map`
(
    `id`         BIGINT    NOT NULL AUTO_INCREMENT,
    `space_id`   BIGINT    NOT NULL,
    `host_id`    BIGINT    NOT NULL,
    `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`)
);

CREATE TABLE `host_kakao`
(
    `id`      BIGINT       NOT NULL AUTO_INCREMENT,
    `host_id` BIGINT       NOT NULL,
    `user_id` VARCHAR(255) NOT NULL,
    PRIMARY KEY (`id`)
);

CREATE TABLE `guest_book_card`
(
    `id`         BIGINT    NOT NULL AUTO_INCREMENT,
    `space_id`   BIGINT    NOT NULL,
    `guest_id`   BIGINT    NOT NULL,
    `message`    VARCHAR(255) NULL,
    `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`)
);

CREATE TABLE `guest_book_card_photo`
(
    `id`                 BIGINT       NOT NULL AUTO_INCREMENT,
    `guest_book_card_id` BIGINT       NOT NULL,
    `original_name`      VARCHAR(255) NOT NULL,
    `path`               VARCHAR(255) NOT NULL,
    `capacity`           BIGINT       NOT NULL,
    `created_at`         TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at`         TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`)
);

CREATE TABLE `product`
(
    `id`          BIGINT    NOT NULL AUTO_INCREMENT,
    `space_id`    BIGINT    NOT NULL,
    `title`       VARCHAR(255) NULL,
    `category`    VARCHAR(255) NULL,
    `author_name` VARCHAR(255) NULL,
    `description` VARCHAR(255) NULL,
    `created_at`  TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at`  TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`)
);

CREATE TABLE `product_photo`
(
    `id`            BIGINT    NOT NULL AUTO_INCREMENT,
    `product_id`    BIGINT    NOT NULL,
    `sort_order`    INT NULL,
    `original_name` VARCHAR(255) NULL,
    `path`          VARCHAR(255) NULL,
    `capacity`      BIGINT NULL,
    `created_at`    TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at`    TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`)
);

CREATE TABLE `space_photo`
(
    `id`            BIGINT    NOT NULL AUTO_INCREMENT,
    `space_id`      BIGINT    NOT NULL,
    `original_name` VARCHAR(255) NULL,
    `path`          VARCHAR(255) NULL,
    `capacity`      BIGINT NULL,
    `created_at`    TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at`    TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`)
);

-- Foreign Key Constraints
ALTER TABLE `space_host_map`
    ADD CONSTRAINT `FK_space_TO_space_host_map` FOREIGN KEY (`space_id`) REFERENCES `space` (`id`);

ALTER TABLE `space_host_map`
    ADD CONSTRAINT `FK_host_TO_space_host_map` FOREIGN KEY (`host_id`) REFERENCES `host` (`id`);

ALTER TABLE `host_kakao`
    ADD CONSTRAINT `FK_host_TO_host_kakao` FOREIGN KEY (`host_id`) REFERENCES `host` (`id`);

ALTER TABLE `guest_book_card`
    ADD CONSTRAINT `FK_space_TO_guest_book_card` FOREIGN KEY (`space_id`) REFERENCES `space` (`id`);

ALTER TABLE `guest_book_card`
    ADD CONSTRAINT `FK_guest_TO_guest_book_card` FOREIGN KEY (`guest_id`) REFERENCES `guest` (`id`);

ALTER TABLE `guest_book_card_photo`
    ADD CONSTRAINT `FK_guest_book_card_TO_guest_book_card_photo` FOREIGN KEY (`guest_book_card_id`) REFERENCES `guest_book_card` (`id`);

ALTER TABLE `product`
    ADD CONSTRAINT `FK_space_TO_product` FOREIGN KEY (`space_id`) REFERENCES `space` (`id`);

ALTER TABLE `product_photo`
    ADD CONSTRAINT `FK_product_TO_product_photo` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`);

ALTER TABLE `space_photo`
    ADD CONSTRAINT `FK_space_TO_space_photo` FOREIGN KEY (`space_id`) REFERENCES `space` (`id`);

CREATE UNIQUE INDEX `UX_space_code` ON `space` (`code`);
