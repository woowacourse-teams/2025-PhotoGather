package com.forgather.domain.product.dto;

import java.util.ArrayList;
import java.util.List;

public record ProductsResponse(
    List<SimpleProductResponse> products
) {

    public ProductsResponse(List<SimpleProductResponse> products) {
        this.products = new ArrayList<>(products);
    }
}
