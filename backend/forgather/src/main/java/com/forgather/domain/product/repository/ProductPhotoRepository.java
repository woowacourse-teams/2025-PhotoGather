package com.forgather.domain.product.repository;

import java.util.List;
import java.util.Optional;

import com.forgather.domain.product.model.Product;
import com.forgather.domain.product.model.ProductPhoto;

public interface ProductPhotoRepository {

    ProductPhoto save(ProductPhoto photo);

    Optional<ProductPhoto> findFirstByProductAndDeletedAtIsNull(Product product);

    List<ProductPhoto> findAllByProductAndDeletedAtIsNull(Product product);

    <S extends ProductPhoto> List<S> saveAll(Iterable<S> photos);

}
