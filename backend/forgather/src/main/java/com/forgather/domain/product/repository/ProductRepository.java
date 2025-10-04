package com.forgather.domain.product.repository;

import java.util.Optional;

import com.forgather.domain.product.model.Product;

public interface ProductRepository {
    Product save(Product product);

    Optional<Product> findBySpaceCode(String spaceCode);
}
