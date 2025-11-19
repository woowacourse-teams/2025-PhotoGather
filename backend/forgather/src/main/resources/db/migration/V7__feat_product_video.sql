ALTER TABLE `product`
    ADD COLUMN `video_url` VARCHAR(512) NOT NULL DEFAULT '',
    ADD COLUMN `is_video_after_photo` TINYINT NOT NULL DEFAULT 0;
