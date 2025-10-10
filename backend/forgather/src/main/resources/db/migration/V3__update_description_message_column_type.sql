-- product.description
-- VARCHAR 문자수 1000자로 수정
ALTER TABLE `product`
    MODIFY COLUMN `description` VARCHAR(1000) NOT NULL;

-- guest_book_card.message
-- VARCHAR 문자수 500자로 수정
-- null -> not null 변경
ALTER TABLE `guest_book_card`
    MODIFY COLUMN `message` VARCHAR(500) NOT NULL;
