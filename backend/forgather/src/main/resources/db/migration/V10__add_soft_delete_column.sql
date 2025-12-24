ALTER TABLE `space`
    ADD COLUMN `deleted_at` TIMESTAMP NULL;

ALTER TABLE `space_host_map`
    ADD COLUMN `deleted_at` TIMESTAMP NULL;

ALTER TABLE `space_photo`
    ADD COLUMN `deleted_at` TIMESTAMP NULL;

ALTER TABLE `product`
    ADD COLUMN `deleted_at` TIMESTAMP NULL;

ALTER TABLE `product_photo`
    ADD COLUMN `deleted_at` TIMESTAMP NULL;

ALTER TABLE `guest`
    ADD COLUMN `deleted_at` TIMESTAMP NULL;

ALTER TABLE `guest_book_card`
    ADD COLUMN `deleted_at` TIMESTAMP NULL;

ALTER TABLE `guest_book_card_photo`
    ADD COLUMN `deleted_at` TIMESTAMP NULL;
