package com.forgather.domain.guestbook.service;

import static com.forgather.domain.upload.domain.FilePathGenerator.generateContentsFilePath;
import static com.forgather.domain.upload.domain.UploadCategory.GUESTBOOK;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.forgather.domain.guestbook.dto.GuestBookCardResponse;
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
import com.forgather.global.auth.model.Host;
import com.forgather.global.auth.repository.SpaceHostMapRepository;
import com.forgather.global.exception.BaseException;
import com.forgather.global.exception.NotFoundException;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class GuestBookService {

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

    public GuestBookCardResponse readCard(Host host, String spaceCode, Long guestBookCardId) {
        Space space = spaceRepository.getByCodeOrThrow(spaceCode);
        validateCanRead(space, host);

        GuestBookCard guestBookCard = getGuestBookCard(guestBookCardId, space);
        if (isSpaceHost(space, host)) {
            guestBookCard.read();
        }

        List<GuestBookCardPhoto> photos = guestBookCardPhotoRepository.findAllByGuestBookCard(guestBookCard);
        return new GuestBookCardResponse(guestBookCard, photos);
    }

    private void validateCanRead(Space space, Host host) {
        if (isSpaceHost(space, host)) { // 스페이스 호스트
            return;
        }
        if (space.isPublic()) { // 공개 스페이스
            return;
        }
        throw new BaseException("방문자는 비공개 스페이스의 방명록을 조회할 수 없습니다. spaceCode: " + space.getCode());
    }

    private boolean isSpaceHost(Space space, Host host) {
        return spaceHostMapRepository.findBySpaceAndHost(space, host).isPresent();
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
}
