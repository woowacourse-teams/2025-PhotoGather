package com.forgather.domain.space.service;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.forgather.domain.space.dto.CreateSpaceRequest;
import com.forgather.domain.space.dto.CreateSpaceResponse;
import com.forgather.domain.space.dto.SpaceResponse;
import com.forgather.domain.space.dto.UpdateSpaceRequest;
import com.forgather.domain.space.model.Space;
import com.forgather.domain.space.model.SpacePhoto;
import com.forgather.domain.space.repository.SpacePhotoRepository;
import com.forgather.domain.space.repository.SpaceRepository;
import com.forgather.domain.upload.ContentsStorage;
import com.forgather.global.auth.model.Host;
import com.forgather.global.exception.FileUploadException;
import com.forgather.global.util.RandomCodeGenerator;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
public class SpaceService {

    private final SpaceRepository spaceRepository;
    private final SpacePhotoRepository spacePhotoRepository;
    private final RandomCodeGenerator codeGenerator;
    private final ContentsStorage contentsStorage;

    @Transactional
    public CreateSpaceResponse create(CreateSpaceRequest request, MultipartFile file, Host host) {
        String spaceCode = codeGenerator.generate(10);
        Space space = spaceRepository.save(request.toEntity(spaceCode, host));
        if (file == null || file.isEmpty()) {
            return CreateSpaceResponse.from(space);
        }
        String path = uploadSpacePicture(file, spaceCode);
        spacePhotoRepository.save(new SpacePhoto(space, file.getOriginalFilename(), path, file.getSize()));
        return CreateSpaceResponse.from(space);
    }

    // TODO: 외부 API -> 트랜잭션 분리
    private String uploadSpacePicture(MultipartFile file, String spaceCode) {
        try {
            log.atInfo()
                .addKeyValue("spaceCode", spaceCode)
                .addKeyValue("originalName", file.getOriginalFilename())
                .log("파일 업로드 시작 {}, {}", spaceCode, file.getSize());
            return contentsStorage.upload(spaceCode, file);
        } catch (IOException e) {
            throw new FileUploadException("파일 업로드에 실패했습니다. 파일 이름: " + file.getOriginalFilename(), e);
        }
    }

    public SpaceResponse getSpaceInformation(String spaceCode) {
        Space space = spaceRepository.getByCode(spaceCode);
        SpacePhoto spacePhoto = spacePhotoRepository.getBySpace(space);
        return SpaceResponse.from(space, spacePhoto);
    }

    @Transactional
    public SpaceResponse update(String spaceCode, UpdateSpaceRequest request, MultipartFile file, Host host) {
        Space space = spaceRepository.getByCode(spaceCode);
        space.validateHost(host);
        space.update(request.name(), request.description(), request.isPublic(), request.instagramUsername(),
            request.email());
        if (file != null && !file.isEmpty()) {
            updateSpacePhoto(spaceCode, file, space);
        }
        SpacePhoto spacePhoto = spacePhotoRepository.getBySpace(space);
        return SpaceResponse.from(space, spacePhoto);
    }

    private void updateSpacePhoto(String spaceCode, MultipartFile file, Space space) {
        Optional<SpacePhoto> existingSpacePhoto = spacePhotoRepository.findBySpace(space);
        String newPath = uploadSpacePicture(file, spaceCode);

        if (existingSpacePhoto.isPresent()) {
            // 이미 스페이스 프로필이 존재하면 기존 사진 삭제 후 엔티티 업데이트
            SpacePhoto existingPhoto = existingSpacePhoto.get();
            String oldPath = existingPhoto.getPath();
            existingPhoto.update(file.getOriginalFilename(), newPath, file.getSize());
            contentsStorage.deleteContent(oldPath);
        } else {
            // 스페이스 프로필이 없으면 새로 생성
            spacePhotoRepository.save(new SpacePhoto(space, file.getOriginalFilename(), newPath, file.getSize()));
        }
    }

    @Transactional
    public void delete(String spaceCode, Host host) {
        Space space = spaceRepository.getByCode(spaceCode);
        space.validateHost(host);
        SpacePhoto spacePhoto = spacePhotoRepository.getBySpace(space);
        spacePhotoRepository.delete(spacePhoto);
        contentsStorage.deleteContent(spacePhoto.getPath());
        spaceRepository.delete(space);
    }

    public List<SpaceResponse> getSpacesInformation(Host host) {
        return host.getSpaceHostMap().stream()
            .map(spaceHostMap ->
                SpaceResponse.from(spaceHostMap.getSpace(), null)
            )
            .toList();
    }
}
