package com.forgather.fixture;

import com.forgather.domain.product.model.Product;
import com.forgather.domain.space.model.Space;
import com.forgather.global.auth.model.Host;

public class ProductFixture {

    private static Space space = new Space(
        new Host("leo", "url"),
        "1234567890",
        "test",
        "test",
        "test",
        true,
        "test",
        "test"
    );

    public static Product createProductWithSpace(Space space) {
        return new Product(space, "title", "category", "authorName", "description");
    }

    public static Product createProductWithTitle(String title) {
        return new Product(space, title, "category", "authorName", "description");
    }

    public static Product createProductWithCategory(String category) {
        return new Product(space, "title", category, "authorName", "description");
    }

    public static Product createProductWithAuthorName(String authorName) {
        return new Product(space, "title", "category", authorName, "description");
    }

    public static Product createProductWithDescription(String description) {
        return new Product(space, "title", "category", "authorName", description);
    }
}
