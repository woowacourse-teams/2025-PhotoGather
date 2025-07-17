package com.forgather.domain.space.service;


import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.forgather.domain.space.dto.PhotoResponse;
import com.forgather.domain.space.dto.PhotosResponse;
import com.forgather.domain.space.model.Photo;
import com.forgather.domain.space.model.Space;
import com.forgather.domain.space.repository.PhotoRepository;
import com.forgather.domain.space.repository.SpaceRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class PhotoService {

    private final PhotoRepository photoRepository;
    private final SpaceRepository spaceRepository;

    public PhotoResponse get(String spaceCode, Long photoId) {
        Space space = spaceRepository.getBySpaceCode(spaceCode);
        Photo photo = photoRepository.getById(photoId);
        photo.validateSpace(space);
        return PhotoResponse.from(photo);
    }

    public PhotosResponse getAll(String spaceCode, Pageable pageable) {
        Space space = spaceRepository.getBySpaceCode(spaceCode);
        Page<Photo> photos = photoRepository.findAllBySpace(space, pageable);
        return PhotosResponse.from(photos);
    }
}
