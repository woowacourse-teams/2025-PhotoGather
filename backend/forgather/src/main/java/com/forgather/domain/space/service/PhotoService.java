package com.forgather.domain.space.service;

import com.forgather.domain.space.dto.PhotoResponse;
import com.forgather.domain.space.model.Photo;
import com.forgather.domain.space.repository.PhotoRepository;

import lombok.RequiredArgsConstructor;

import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class PhotoService {

    private final PhotoRepository photoRepository;

    public PhotoResponse get(String hostCode, Long photoId) {
        Photo photo = photoRepository.getById(photoId);
        photo.validateHostCode(hostCode);
        return PhotoResponse.from(photo);
    }
}
