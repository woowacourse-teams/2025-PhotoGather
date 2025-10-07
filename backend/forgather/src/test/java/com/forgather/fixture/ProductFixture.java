package com.forgather.fixture;

import static com.forgather.fixture.SpaceFixture.createSpace;

import com.forgather.domain.product.model.Product;
import com.forgather.domain.space.model.Space;

public class ProductFixture {

    public static Product createProduct() {
        return new Product(createSpace(), "title", "category", "authorName", "description");
    }

    public static Product createProductWithSpace(Space space) {
        return new Product(space, "title", "category", "authorName", "description");
    }

    public static Product createProductWithTitle(String title) {
        return new Product(createSpace(), title, "category", "authorName", "description");
    }

    public static Product createProductWithCategory(String category) {
        return new Product(createSpace(), "title", category, "authorName", "description");
    }

    public static Product createProductWithAuthorName(String authorName) {
        return new Product(createSpace(), "title", "category", authorName, "description");
    }

    public static Product createProductWithDescription(String description) {
        return new Product(createSpace(), "title", "category", "authorName", description);
    }

    public static Product createProductWithTitleCategoryAuthorNameDescription(
        String title,
        String category,
        String authorName,
        String description
    ) {
        return new Product(createSpace(), title, category, authorName, description);
    }
}
