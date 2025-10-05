package com.forgather.domain.product.repository.jpa;

import org.springframework.data.jpa.repository.JpaRepository;

import com.forgather.domain.product.model.ProductPhoto;
import com.forgather.domain.product.repository.ProductPhotoRepository;

public interface ProductPhotoJpaRepository extends JpaRepository<ProductPhoto, Long>, ProductPhotoRepository {
}
