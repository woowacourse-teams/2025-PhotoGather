package com.forgather.domain.space.service;

import java.io.IOException;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.forgather.domain.space.dto.CreateSpaceRequest;
import com.forgather.domain.space.dto.CreateSpaceResponse;
import com.forgather.domain.space.dto.SpacePhotoResponse;
import com.forgather.domain.space.dto.SpaceResponse;
import com.forgather.domain.space.dto.UpdateSpaceRequest;
import com.forgather.domain.space.model.Space;
import com.forgather.domain.space.model.SpacePhoto;
import com.forgather.domain.space.repository.SpacePhotoRepository;
import com.forgather.domain.space.repository.SpaceRepository;
import com.forgather.domain.upload.domain.ContentsStorage;
import com.forgather.global.auth.model.Host;
import com.forgather.global.auth.model.SpaceHostMap;
import com.forgather.global.auth.repository.SpaceHostMapRepository;
import com.forgather.global.exception.BaseException;
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
    private final SpaceHostMapRepository spaceHostMapRepository;
    private final RandomCodeGenerator codeGenerator;
    private final ContentsStorage contentsStorage;

    @Transactional
    public CreateSpaceResponse create(CreateSpaceRequest request, MultipartFile file, Host host) {
        String spaceCode = codeGenerator.generate(10);
        Space space = spaceRepository.save(request.toEntity(spaceCode));
        // TODO: 호스트 검증 추가 & SpaceHostMap 등록 추가
        if (host != null) {
            spaceHostMapRepository.save(new SpaceHostMap(space, host));
        }
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

    @Transactional(readOnly = true)
    public SpaceResponse getSpaceInformation(String spaceCode) {
        Space space = spaceRepository.getByCodeOrThrow(spaceCode);
        return spacePhotoRepository.findBySpace(space)
            .map(spacePhoto -> SpaceResponse.from(space, SpacePhotoResponse.exists(spacePhoto.getPath())))
            .orElseGet(() -> SpaceResponse.from(space, SpacePhotoResponse.notExists()));
    }

    @Transactional
    public SpaceResponse update(String spaceCode, UpdateSpaceRequest request, MultipartFile file, Host host) {
        Space space = spaceRepository.getByCodeOrThrow(spaceCode);
        // TODO: host 검증
        space.update(request.name(), request.description(), request.isPublic(), request.instagramUsername(),
            request.email());

        if (request.isDeletePhoto() == null || !request.isDeletePhoto()) {
            handlePhotoWithoutDeleteRequest(space, file, spaceCode);
        } else {
            handlePhotoWithDeleteRequest(space, file, spaceCode);
        }

        return spacePhotoRepository.findBySpace(space)
            .map(spacePhoto -> SpaceResponse.from(space, SpacePhotoResponse.exists(spacePhoto.getPath())))
            .orElseGet(() -> SpaceResponse.from(space, SpacePhotoResponse.notExists()));
    }

    /**
     * 삭제 요청이 없는 경우: 새 파일이 있으면 업로드 (기존 사진이 없어야 함)
     */
    private void handlePhotoWithoutDeleteRequest(Space space, MultipartFile file, String spaceCode) {
        if (file != null && !file.isEmpty()) {
            uploadNewPhoto(space, file, spaceCode);
        }
    }

    /**
     * 삭제 요청이 있는 경우: 기존 사진을 삭제하고, 파일이 존재하면 업로드
     */
    private void handlePhotoWithDeleteRequest(Space space, MultipartFile file, String spaceCode) {
        deleteExistingPhoto(space);
        if (file != null && !file.isEmpty()) {
            uploadNewPhoto(space, file, spaceCode);
        }
    }

    private void uploadNewPhoto(Space space, MultipartFile file, String spaceCode) {
        spacePhotoRepository.findBySpace(space)
            .ifPresent(photo -> {
                throw new BaseException("스페이스 사진이 이미 존재합니다. 기존 스페이스 사진을 삭제 해주세요.");
            });

        String path = uploadSpacePicture(file, spaceCode);
        spacePhotoRepository.save(new SpacePhoto(space, file.getOriginalFilename(), path, file.getSize()));
    }

    private void deleteExistingPhoto(Space space) {
        SpacePhoto existingPhoto = spacePhotoRepository.findBySpace(space)
            .orElseThrow(() -> new BaseException("삭제할 스페이스 사진이 존재하지 않습니다."));

        String path = existingPhoto.getPath();
        spacePhotoRepository.delete(existingPhoto);
        contentsStorage.deleteContent(path);
    }

    @Transactional
    public void delete(String spaceCode, Host host) {
        Space space = spaceRepository.getByCodeOrThrow(spaceCode);
        // TODO: host 검증
        spaceHostMapRepository.deleteBySpace(space);
        spacePhotoRepository.findBySpace(space)
            .ifPresent(spacePhoto -> {
                spacePhotoRepository.delete(spacePhoto);
                contentsStorage.deleteContent(spacePhoto.getPath());
            });
        spaceRepository.delete(space);
    }

    @Transactional(readOnly = true)
    public List<SpaceResponse> getSpacesInformation(Host host) {
        List<SpaceHostMap> spaceHostMaps = spaceHostMapRepository.findAllByHost(host);
        return spaceHostMaps.stream()
            .map(spaceHostMap -> {
                Space space = spaceHostMap.getSpace();
                return spacePhotoRepository.findBySpace(space)
                    .map(photo -> SpaceResponse.from(space, SpacePhotoResponse.exists(photo.getPath())))
                    .orElseGet(() -> SpaceResponse.from(space, SpacePhotoResponse.notExists()));
            })
            .toList();
    }
}
