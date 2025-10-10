-- product.description
-- VARCHAR 바이트 제한 수정(애플리케이션 = 1000자, db는 이모지(4바이트)를 고려해서 4000자)
ALTER TABLE `product`
    MODIFY COLUMN `description` VARCHAR(4000) NOT NULL;

-- guest_book_card.message
-- VARCHAR 바이트 제한 수정(애플리케이션 = 300자, db는 확장을 고려해서 500자, 이모지(4바이트)를 고려해서 2000자)
-- null -> not null 변경
ALTER TABLE `guest_book_card`
    MODIFY COLUMN `message` VARCHAR(2000) NOT NULL;
