package com.forgather.domain.product.repository;

import java.util.Optional;

import org.springframework.http.HttpStatus;

import com.forgather.domain.product.model.Product;
import com.forgather.domain.space.model.Space;
import com.forgather.global.exception.BaseNullPointerException;
import com.forgather.global.exception.NotFoundException;

public interface ProductRepository {
    Product save(Product product);

    void delete(Product product);

    Optional<Product> findBySpace(Space space);

    default Product getBySpaceOrThrow(Space space) {
        if (space == null) {
            throw new BaseNullPointerException("스페이스는 null일 수 없습니다.", HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return findBySpace(space)
            .orElseThrow(() -> new NotFoundException("해당 스페이스에 등록된 작품이 없습니다. spaceCode: " + space.getCode()));
    }
}
