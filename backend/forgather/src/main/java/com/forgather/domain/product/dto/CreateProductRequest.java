package com.forgather.domain.product.dto;

import java.util.List;

import com.forgather.domain.product.model.Product;
import com.forgather.domain.space.model.Space;

import io.swagger.v3.oas.annotations.media.Schema;

public record CreateProductRequest(
    @Schema(description = "작품명", example = "고귀한 의자", maxLength = 50)
    String title,

    @Schema(description = "작품 카테고리", example = "Chair", maxLength = 20)
    String category,

    @Schema(description = "작가명", example = "검은수염", maxLength = 20)
    String authorName,

    @Schema(description = "작가명", example = "150 x 200 x 200\n\n매우 고귀한 의자입니다.\n조심해서 다뤄주세요.", maxLength = 20)
    String description,

    @Schema(description = "작품 관련 사진들", example = """
        [
            {
                "originalName": "chair1.jpg",
                "path": "1234567890/abc.jpg",
                "capacity": 1024
            },
            {
                "originalName": "chair2.jpg",
                "path": "1234567890/def.jpg",
                "capacity": 2048
            },
            {
                "originalName": "chair3.jpg",
                "path": "1234567890/ghi.jpg",
                "capacity": 4096
            }
        ]
        """)
    List<CreatePhotoRequest> photos
) {

    public Product toEntity(Space space) {
        return new Product(space, title, category, authorName, description);
    }
}
