package com.forgather.domain.guestbook.service;

import static com.forgather.domain.upload.domain.FilePathGenerator.generateContentsFilePath;
import static com.forgather.domain.upload.domain.UploadCategory.GUESTBOOK;

import java.util.ArrayList;
import java.util.List;

import org.springframework.context.ApplicationEventPublisher;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.forgather.domain.guestbook.dto.DeleteGuestBookCardPhotosRequest;
import com.forgather.domain.guestbook.dto.GuestBookCardResponse;
import com.forgather.domain.guestbook.dto.GuestBookCardSimpleResponse;
import com.forgather.domain.guestbook.dto.GuestBookResponse;
import com.forgather.domain.guestbook.dto.WriteGuestBookCardPhotoRequest;
import com.forgather.domain.guestbook.dto.WriteGuestBookCardRequest;
import com.forgather.domain.guestbook.dto.WriteGuestBookCardResponse;
import com.forgather.domain.guestbook.model.Guest;
import com.forgather.domain.guestbook.model.GuestBookCard;
import com.forgather.domain.guestbook.model.GuestBookCardPhoto;
import com.forgather.domain.guestbook.model.GuestBookCardPhotos;
import com.forgather.domain.guestbook.repository.GuestBookCardPhotoRepository;
import com.forgather.domain.guestbook.repository.GuestBookCardRepository;
import com.forgather.domain.guestbook.repository.GuestRepository;
import com.forgather.domain.space.model.Space;
import com.forgather.domain.space.repository.SpaceRepository;
import com.forgather.domain.upload.domain.ContentsStorage;
import com.forgather.domain.upload.event.DeletePhotoEvent;
import com.forgather.global.auth.model.Host;
import com.forgather.global.auth.repository.SpaceHostMapRepository;
import com.forgather.global.exception.BaseNullPointerException;
import com.forgather.global.exception.ForbiddenException;
import com.forgather.global.exception.NotFoundException;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class GuestBookService {

    private final ApplicationEventPublisher eventPublisher;
    private final SpaceRepository spaceRepository;
    private final SpaceHostMapRepository spaceHostMapRepository;
    private final GuestRepository guestRepository;
    private final GuestBookCardRepository guestBookCardRepository;
    private final GuestBookCardPhotoRepository guestBookCardPhotoRepository;
    private final ContentsStorage contentsStorage;

    @Transactional
    public WriteGuestBookCardResponse writeCard(String spaceCode, WriteGuestBookCardRequest request) {
        Space space = spaceRepository.getByCodeOrThrow(spaceCode);
        Guest guest = guestRepository.save(new Guest(request.nickname()));
        GuestBookCard guestBookCard = guestBookCardRepository.save(request.toEntity(space, guest));

        GuestBookCardPhotos guestBookCardPhotos = getGuestBookCardPhotos(spaceCode, request, guestBookCard);
        guestBookCardPhotoRepository.saveAll(guestBookCardPhotos.getAll());

        return new WriteGuestBookCardResponse(guestBookCard, guestBookCardPhotos.getAll());
    }

    private GuestBookCardPhotos getGuestBookCardPhotos(
        String spaceCode,
        WriteGuestBookCardRequest request,
        GuestBookCard guestBookCard
    ) {
        List<GuestBookCardPhoto> photos = new ArrayList<>();
        for (WriteGuestBookCardPhotoRequest photoRequest : request.photos()) {
            String path = generateContentsFilePath(
                contentsStorage.getRootDirectory(),
                spaceCode,
                GUESTBOOK,
                photoRequest.uploadFileName()
            );
            GuestBookCardPhoto photo = photoRequest.toEntity(path, guestBookCard);
            photos.add(photo);
        }
        return new GuestBookCardPhotos(photos);
    }

    public GuestBookResponse read(Host host, String spaceCode, Pageable pageable) {
        Space space = spaceRepository.getByCodeOrThrow(spaceCode);
        validateCanRead(space, host);
        Page<GuestBookCard> guestBookCards = guestBookCardRepository.findAllBySpace(space, pageable);
        boolean isHost = host != null && isSpaceHost(space, host);
        Page<GuestBookCardSimpleResponse> simpleResponses = guestBookCards.map(
            guestBookCard -> new GuestBookCardSimpleResponse(
                guestBookCard.getId(),
                guestBookCard.getNickname(),
                guestBookCardPhotoRepository.existsByGuestBookCard(guestBookCard),
                isHost ? guestBookCard.isRead() : null
            )
        );
        return new GuestBookResponse(simpleResponses);
    }

    @Transactional
    public GuestBookCardResponse readCard(Host host, String spaceCode, Long guestBookCardId) {
        Space space = spaceRepository.getByCodeOrThrow(spaceCode);
        validateCanRead(space, host);

        GuestBookCard guestBookCard = getGuestBookCard(guestBookCardId, space);
        if (host != null && isSpaceHost(space, host)) {
            guestBookCard.read();
        }

        List<GuestBookCardPhoto> photos = guestBookCardPhotoRepository.findAllByGuestBookCard(guestBookCard);
        return new GuestBookCardResponse(guestBookCard, photos);
    }

    private void validateCanRead(Space space, Host host) {
        if (space.isPublic()) { // 공개 스페이스
            return;
        }
        if (host != null && isSpaceHost(space, host)) { // 스페이스 호스트
            return;
        }
        throw new ForbiddenException("방문자는 비공개 스페이스의 방명록을 조회할 수 없습니다. spaceCode: " + space.getCode());
    }

    @Transactional
    public void deleteCard(Host host, String spaceCode, Long guestBookCardId) {
        Space space = spaceRepository.getByCodeOrThrow(spaceCode);
        // validateSpaceHost(host, space); // TODO 검증 활성화
        GuestBookCard guestBookCard = getGuestBookCard(guestBookCardId, space);
        deleteGuestBookCardPhotos(guestBookCard);
        guestBookCardRepository.delete(guestBookCard);
    }

    private void deleteGuestBookCardPhotos(GuestBookCard guestBookCard) {
        List<GuestBookCardPhoto> photos = guestBookCardPhotoRepository.findAllByGuestBookCard(guestBookCard);
        deleteGuestBookCardPhotos(photos);
    }

    public void deleteCardPhotos(
        Host host,
        String spaceCode,
        Long guestBookCardId,
        DeleteGuestBookCardPhotosRequest request
    ) {
        Space space = spaceRepository.getByCodeOrThrow(spaceCode);
        // validateSpaceHost(host, space); // TODO 검증 활성화
        GuestBookCardPhotos guestBookCardPhotos = getGuestBookCardPhotos(space, guestBookCardId);
        List<GuestBookCardPhoto> deletedPhotos = guestBookCardPhotos.deleteByIds(request.deletePhotoIds());
        deleteGuestBookCardPhotos(deletedPhotos);
    }

    private GuestBookCardPhotos getGuestBookCardPhotos(Space space, Long guestBookCardId) {
        GuestBookCard guestBookCard = getGuestBookCard(guestBookCardId, space);
        return new GuestBookCardPhotos(guestBookCardPhotoRepository.findAllByGuestBookCard(guestBookCard));
    }

    private GuestBookCard getGuestBookCard(Long guestBookCardId, Space space) {
        GuestBookCard guestBookCard = guestBookCardRepository.getByIdOrThrow(guestBookCardId);
        if (guestBookCard.equalsSpace(space)) {
            return guestBookCard;
        }
        throw new NotFoundException(
            "해당 스페이스에 존재하지 않는 방명록 카드입니다. spaceCode: %s, guestBookCardId: %d"
                .formatted(space.getCode(), guestBookCardId)
        );
    }

    private void validateSpaceHost(Host host, Space space) {
        if (isSpaceHost(space, host)) {
            return;
        }
        throw new ForbiddenException(
            "해당 스페이스에 대한 접근 권한이 없습니다. spaceCode: %s, hostId: %d".formatted(space.getCode(), host.getId())
        );
    }

    private boolean isSpaceHost(Space space, Host host) {
        if (space == null || host == null) {
            throw new BaseNullPointerException("스페이스와 호스트는 null일 수 없습니다.");
        }
        return spaceHostMapRepository.findBySpaceAndHost(space, host).isPresent();
    }

    private void deleteGuestBookCardPhotos(List<GuestBookCardPhoto> photos) {
        guestBookCardPhotoRepository.deleteAll(photos);
        eventPublisher.publishEvent(new DeletePhotoEvent(this, photos)); // 클라우드 삭제 이벤트 발행
    }
}
