package com.forgather.domain.space.dto;

import java.util.List;

import org.springframework.data.domain.Page;

import com.forgather.domain.space.model.Photo;

import io.swagger.v3.oas.annotations.media.Schema;

public record PhotosResponse(

    @Schema(description = "사진 목록")
    List<InnerPhoto> photos,

    @Schema(description = "현재 페이지 번호 (1부터 시작)", example = "1")
    int currentPage,

    @Schema(description = "페이지당 사진 개수", example = "15")
    int pageSize,

    @Schema(description = "총 페이지 수", example = "10")
    int totalPages
) {

    public static PhotosResponse from(Page<Photo> photos) {
        return new PhotosResponse(
            photos.stream().map(InnerPhoto::from).toList(),
            photos.getNumber() + 1,
            photos.getSize(),
            photos.getTotalPages()
        );
    }

    public record InnerPhoto(

        @Schema(description = "사진 ID", example = "1")
        Long id,

        @Schema(description = "사진 경로", example = "/photos/space123/photo1.jpg")
        String path
    ) {

        public static InnerPhoto from(Photo photo) {
            return new InnerPhoto(
                photo.getId(),
                photo.getPath()
            );
        }
    }
}
