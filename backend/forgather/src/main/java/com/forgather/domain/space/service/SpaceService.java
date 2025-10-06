package com.forgather.domain.space.service;

import java.io.IOException;
import java.util.List;

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
        return SpaceResponse.from(space);
    }

    @Transactional
    public SpaceResponse update(String spaceCode, UpdateSpaceRequest request, Host host) {
        Space space = spaceRepository.getByCode(spaceCode);
        space.validateHost(host);
        // TODO: update space

        return SpaceResponse.from(space);
    }

    @Transactional
    public void delete(String spaceCode, Host host) {
        Space space = spaceRepository.getByCode(spaceCode);
        space.validateHost(host);
        spaceRepository.delete(space);
    }

    public List<SpaceResponse> getSpacesInformation(Host host) {
        return host.getSpaceHostMap().stream()
            .map(spaceHostMap ->
                SpaceResponse.from(spaceHostMap.getSpace())
            )
            .toList();
    }
}
