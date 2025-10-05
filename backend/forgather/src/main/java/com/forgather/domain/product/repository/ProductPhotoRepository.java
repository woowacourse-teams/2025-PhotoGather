package com.forgather.domain.product.repository;

import java.util.List;

import com.forgather.domain.product.model.Product;
import com.forgather.domain.product.model.ProductPhoto;

public interface ProductPhotoRepository {

    ProductPhoto save(ProductPhoto photo);

    List<ProductPhoto> findAllByProduct(Product product);

    void deleteAll(Iterable<? extends ProductPhoto> photos);

    <S extends ProductPhoto> List<S> saveAll(Iterable<S> photos);
}
