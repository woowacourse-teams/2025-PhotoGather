package com.forgather.domain.product.repository.jpa;

import org.springframework.data.jpa.repository.JpaRepository;

import com.forgather.domain.product.model.Product;
import com.forgather.domain.product.repository.ProductRepository;

public interface ProductJpaRepository extends JpaRepository<Product, Long>, ProductRepository {
}
