-- 1. space 테이블: 기존 NULL 값을 empty string으로 업데이트
UPDATE `space`
SET `description` = ''
WHERE `description` IS NULL;

UPDATE `space`
SET `instagram_username` = ''
WHERE `instagram_username` IS NULL;

UPDATE `space`
SET `email` = ''
WHERE `email` IS NULL;

-- 2. space 테이블: NOT NULL 제약 조건 및 DEFAULT 값 추가
ALTER TABLE `space`
    MODIFY COLUMN `description` VARCHAR (255) NOT NULL DEFAULT '';

ALTER TABLE `space`
    MODIFY COLUMN `instagram_username` VARCHAR (255) NOT NULL DEFAULT '';

ALTER TABLE `space`
    MODIFY COLUMN `email` VARCHAR (255) NOT NULL DEFAULT '';

-- 3. product 테이블: 기존 NULL 값을 empty string으로 업데이트
UPDATE `product`
SET `category` = ''
WHERE `category` IS NULL;

UPDATE `product`
SET `author_name` = ''
WHERE `author_name` IS NULL;

-- 4. product 테이블: NOT NULL 제약 조건 및 DEFAULT 값 추가
ALTER TABLE `product`
    MODIFY COLUMN `category` VARCHAR (255) NOT NULL DEFAULT '';

ALTER TABLE `product`
    MODIFY COLUMN `author_name` VARCHAR (255) NOT NULL DEFAULT '';
