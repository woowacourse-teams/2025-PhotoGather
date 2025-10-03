package com.forgather.domain.product.repository;

import com.forgather.domain.product.model.Product;

public interface ProductRepository {
    Product save(Product product);
}
