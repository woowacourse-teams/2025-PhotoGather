package com.forgather.domain.product.repository;

import java.util.Optional;

import com.forgather.domain.product.model.Product;
import com.forgather.global.exception.BaseNullPointerException;
import com.forgather.global.exception.NotFoundException;

public interface ProductRepository {
    Product save(Product product);

    Optional<Product> findBySpaceCode(String spaceCode);

    default Product getBySpaceCodeOrThrow(String spaceCode) {
        if (spaceCode == null) {
            throw new BaseNullPointerException("스페이스의 코드는 null일 수 없습니다.");
        }
        return findBySpaceCode(spaceCode)
            .orElseThrow(() -> new NotFoundException("해당 스페이스 등록된 작품이 없습니다. spaceCode: " + spaceCode));
    }

    void delete(Product product);
}
