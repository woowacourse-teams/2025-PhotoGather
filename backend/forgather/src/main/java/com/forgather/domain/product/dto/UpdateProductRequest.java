package com.forgather.domain.product.dto;

import java.util.List;

import io.swagger.v3.oas.annotations.media.Schema;

public record UpdateProductRequest(

    @Schema(description = "작품명", example = "고귀한 의자", maxLength = 50)
    String title,

    @Schema(description = "작품 카테고리", example = "Chair", maxLength = 20)
    String category,

    @Schema(description = "작가명", example = "히비노카프카", maxLength = 35)
    String authorName,

    @Schema(description = "작품 설명", example = "150 x 200 x 200\n\n고귀하지 않은 의자입니다.\n막 다뤄주세요.", maxLength = 2000)
    String description,

    @Schema(description = "임베드 영상 링크", example = "https://youtu.be/lkuAxAVgAX0?si=OAobeoMmjeGurOHI", maxLength = 512)
    String videoUrl,

    @Schema(description = "영상이 사진 뒤에 오는지 여부", example = "false")
    Boolean isVideoAfterPhoto,

    @Schema(description = "삭제할 작품 사진 목록", example = "[1, 3]")
    List<Long> deletePhotoIds,

    @Schema(description = "새로 업로드한 작품 사진 목록", example = """
        [
            {
                "originalName": "chair4.jpg",
                "uploadFileName": "jkl.jpg",
                "capacity": 1024
            },
            {
                "originalName": "chair5.jpg",
                "uploadFileName": "mno.jpg",
                "capacity": 2048
            },
            {
                "originalName": "chair6.jpg",
                "uploadFileName": "pqr.jpg",
                "capacity": 4096
            }
        ]
        """)
    List<RegisterProductPhotoRequest> newPhotos
) {
}
