package com.forgather.domain.space.service;

import java.io.IOException;
import java.util.Comparator;
import java.util.List;

import org.springframework.context.ApplicationEventPublisher;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.forgather.domain.guestbook.repository.GuestBookCardRepository;
import com.forgather.domain.guestbook.service.GuestBookService;
import com.forgather.domain.product.service.ProductService;
import com.forgather.domain.space.dto.CreateSpaceRequest;
import com.forgather.domain.space.dto.CreateSpaceResponse;
import com.forgather.domain.space.dto.HostSpaceResponse;
import com.forgather.domain.space.dto.SpacePhotoResponse;
import com.forgather.domain.space.dto.SpaceResponse;
import com.forgather.domain.space.dto.UpdateSpaceRequest;
import com.forgather.domain.space.model.Space;
import com.forgather.domain.space.model.SpacePhoto;
import com.forgather.domain.space.repository.SpacePhotoRepository;
import com.forgather.domain.space.repository.SpaceRepository;
import com.forgather.domain.upload.domain.ContentsStorage;
import com.forgather.domain.upload.event.DeletePhotoEvent;
import com.forgather.global.auth.model.Host;
import com.forgather.global.auth.model.SpaceHostMap;
import com.forgather.global.auth.repository.SpaceHostMapRepository;
import com.forgather.global.exception.BaseException;
import com.forgather.global.exception.BaseNullPointerException;
import com.forgather.global.exception.FileUploadException;
import com.forgather.global.exception.ForbiddenException;
import com.forgather.global.exception.UnauthorizedException;
import com.forgather.global.util.RandomCodeGenerator;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
public class SpaceService {

    private final ProductService productService;
    private final GuestBookService guestBookService;
    private final SpaceRepository spaceRepository;
    private final SpacePhotoRepository spacePhotoRepository;
    private final SpaceHostMapRepository spaceHostMapRepository;
    private final GuestBookCardRepository guestBookCardRepository;
    private final RandomCodeGenerator codeGenerator;
    private final ContentsStorage contentsStorage;
    private final ApplicationEventPublisher eventPublisher;

    @Transactional
    public CreateSpaceResponse create(CreateSpaceRequest request, MultipartFile file, Host host) {
        String spaceCode = codeGenerator.generate(10);
        validateHostNull(host);
        Space space = spaceRepository.save(request.toEntity(spaceCode));
        spaceHostMapRepository.save(new SpaceHostMap(space, host));
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
        Long guestBookCardCount = guestBookCardRepository.countBySpace(space);

        return spacePhotoRepository.findBySpace(space)
            .map(spacePhoto -> SpaceResponse.from(space, SpacePhotoResponse.exists(spacePhoto.getPath()),
                guestBookCardCount))
            .orElseGet(() -> SpaceResponse.from(space, SpacePhotoResponse.notExists(), guestBookCardCount));
    }

    @Transactional
    public SpaceResponse update(String spaceCode, UpdateSpaceRequest request, MultipartFile file, Host host) {
        Space space = spaceRepository.getByCodeOrThrow(spaceCode);
        validateSpaceHost(space, host);

        space.update(request.name(), request.description(), request.isPublic(), request.instagramUsername(),
            request.email());

        if (request.isDeletePhoto() == null || !request.isDeletePhoto()) {
            handlePhotoWithoutDeleteRequest(space, file, spaceCode);
        } else {
            handlePhotoWithDeleteRequest(space, file, spaceCode);
        }
        Long guestBookCardCount = guestBookCardRepository.countBySpace(space);

        return spacePhotoRepository.findBySpace(space)
            .map(spacePhoto -> SpaceResponse.from(space, SpacePhotoResponse.exists(spacePhoto.getPath()),
                guestBookCardCount))
            .orElseGet(() -> SpaceResponse.from(space, SpacePhotoResponse.notExists(), guestBookCardCount));
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

        deleteSpacePhoto(existingPhoto);
    }

    @Transactional
    public void delete(String spaceCode, Host host) {
        Space space = spaceRepository.getByCodeOrThrow(spaceCode);
        validateSpaceHost(space, host);

        deleteGuestBookAndProduct(host, space);
        spaceHostMapRepository.deleteBySpace(space);
        spacePhotoRepository.findBySpace(space)
            .ifPresent(this::deleteSpacePhoto);
        spaceRepository.delete(space);
    }

    private void deleteGuestBookAndProduct(Host host, Space space) {
        guestBookService.deleteAllCardsBySpace(host, space);
        productService.deleteIfExists(host, space);
    }

    private void deleteSpacePhoto(SpacePhoto spacePhoto) {
        spacePhotoRepository.delete(spacePhoto);
        eventPublisher.publishEvent(new DeletePhotoEvent(this, spacePhoto));
    }

    @Transactional(readOnly = true)
    public HostSpaceResponse getSpacesInformation(Host host) {
        List<SpaceHostMap> spaceHostMaps = spaceHostMapRepository.findAllByHost(host);

        List<SpaceResponse> spaceResponses = spaceHostMaps.stream()
            .map(spaceHostMap -> {
                Space space = spaceHostMap.getSpace();
                Long guestBookCardCount = guestBookCardRepository.countBySpace(space);
                return spacePhotoRepository.findBySpace(space)
                    .map(photo -> SpaceResponse.from(space, SpacePhotoResponse.exists(photo.getPath()),
                        guestBookCardCount))
                    .orElseGet(() -> SpaceResponse.from(space, SpacePhotoResponse.notExists(), guestBookCardCount));
            })
            .sorted(Comparator.comparingLong(SpaceResponse::id).reversed())
            .toList();
        return new HostSpaceResponse(spaceResponses);
    }

    private void validateSpaceHost(Space space, Host host) {
        validateHostNull(host);
        if (space == null) {
            throw new BaseNullPointerException("스페이스는 null일 수 없습니다.");
        }
        if (spaceHostMapRepository.findBySpaceAndHost(space, host).isPresent()) {
            return;
        }
        throw new ForbiddenException("권한이 존재하지 않습니다.");
    }

    private void validateHostNull(Host host) {
        if (host == null) {
            throw new UnauthorizedException("로그인이 필요합니다.");
        }
    }
}
