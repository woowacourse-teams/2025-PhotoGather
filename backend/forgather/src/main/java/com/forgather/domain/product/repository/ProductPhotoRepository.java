package com.forgather.domain.product.repository;

import java.util.List;
import java.util.Optional;

import com.forgather.domain.product.model.Product;
import com.forgather.domain.product.model.ProductPhoto;

public interface ProductPhotoRepository {

    ProductPhoto save(ProductPhoto photo);

    Optional<ProductPhoto> findFirstByProduct(Product product);

    List<ProductPhoto> findAllByProduct(Product product);

    void deleteAll(Iterable<? extends ProductPhoto> photos);

    <S extends ProductPhoto> List<S> saveAll(Iterable<S> photos);

}
