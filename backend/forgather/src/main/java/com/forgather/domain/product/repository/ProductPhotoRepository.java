package com.forgather.domain.product.repository;

import java.util.List;

import com.forgather.domain.product.model.Product;
import com.forgather.domain.product.model.ProductPhoto;

public interface ProductPhotoRepository {
    ProductPhoto save(ProductPhoto productPhoto);

    List<ProductPhoto> findAllByProduct(Product product);
}
