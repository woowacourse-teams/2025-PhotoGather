package com.forgather.domain.space.dto;

import java.util.List;

import org.springframework.data.domain.Page;

import com.forgather.domain.space.model.Photo;

public record PhotosResponse(
    List<InnerPhoto> photos,
    int currentPage,
    int pageSize,
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
        Long id,
        String path,
        String originalName
    ) {

        public static InnerPhoto from(Photo photo) {
            return new InnerPhoto(
                photo.getId(),
                photo.getPath(),
                photo.getOriginalName()
            );
        }
    }
}
