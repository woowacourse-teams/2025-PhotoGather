package com.forgather.domain.product.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.http.HttpStatus;

import com.forgather.domain.product.model.Product;
import com.forgather.domain.space.model.Space;
import com.forgather.global.exception.BaseNullPointerException;
import com.forgather.global.exception.NotFoundException;

public interface ProductRepository {
    Product save(Product product);

    void delete(Product product);

    List<Product> findAllBySpace(Space space);

    Optional<Product> findBySpaceAndId(Space space, Long id);

    Long countBySpace(Space space);

    /**
     * TODO 작품 복수 등록 마이그레이션 이후 제거
     */
    default Product getBySpaceOrThrow(Space space) {
        if (space == null) {
            throw new BaseNullPointerException("스페이스는 null일 수 없습니다.", HttpStatus.INTERNAL_SERVER_ERROR);
        }
        List<Product> products = findAllBySpace(space);
        if (products.isEmpty()) {
            throw new NotFoundException("해당 스페이스에 등록된 작품이 없습니다. spaceCode: " + space.getCode());
        }
        return products.getFirst();
    }

    default Product getBySpaceAndIdOrThrow(Space space, Long id) {
        if (space == null) {
            throw new BaseNullPointerException("스페이스는 null일 수 없습니다.", HttpStatus.INTERNAL_SERVER_ERROR);
        }
        if (id == null) {
            throw new BaseNullPointerException("작품의 id는 null일 수 없습니다.", HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return findBySpaceAndId(space, id)
            .orElseThrow(() -> new NotFoundException("해당 스페이스에 존재하지 않는 작품입니다. spaceCode: %s, productId: %d"
                .formatted(space.getCode(), id)));
    }
}
