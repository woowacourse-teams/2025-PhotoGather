package com.forgather.domain.product.dto;

import java.util.List;

import com.forgather.domain.product.model.Product;
import com.forgather.domain.product.model.ProductPhoto;

import io.swagger.v3.oas.annotations.media.Schema;

public record ProductResponse(

    @Schema(description = "작품 id", example = "1")
    Long id,

    @Schema(description = "작품명", example = "고귀한 의자")
    String title,

    @Schema(description = "작품 카테고리", example = "Chair")
    String category,

    @Schema(description = "작가명", example = "검은수염")
    String authorName,

    @Schema(description = "작품 설명", example = "150 x 200 x 200\n\n매우 고귀한 의자입니다.\n조심해서 다뤄주세요.")
    String description,

    @Schema(description = "임베드 영상 링크", example = "https://youtu.be/lkuAxAVgAX0?si=OAobeoMmjeGurOHI", maxLength = 512)
    String videoUrl,

    @Schema(description = "영상이 사진 뒤에 오는지 여부", example = "false")
    Boolean isVideoAfterPhoto,

    @Schema(description = "작품 관련 사진들", example = """
        [
            {
                "id": 1,
                "originalName": "chair1.jpg",
                "path": "photogather/v2/spaces/1234567890/product/abc.jpg",
                "order": 1
            },
            {
                "id": 2,
                "originalName": "chair2.jpg",
                "path": "photogather/v2/spaces/1234567890/product/def.jpg",
                "order": 2
            },
            {
                "id": 3,
                "originalName": "chair3.jpg",
                "path": "photogather/v2/spaces/1234567890/product/ghi.jpg",
                "order": 3
            }
        ]
        """)
    List<ProductPhotoResponse> photos
) {

    public ProductResponse(Product product, List<ProductPhoto> photos) {
        this(product.getId(),
            product.getTitle(),
            product.getCategory(),
            product.getAuthorName(),
            product.getDescription(),
            product.getVideoUrl(),
            product.isVideoAfterPhoto(),
            photos.stream().map(ProductPhotoResponse::new).toList()
        );
    }
}
