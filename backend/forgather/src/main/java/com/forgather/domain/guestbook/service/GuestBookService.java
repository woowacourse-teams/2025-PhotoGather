package com.forgather.domain.guestbook.service;

import static com.forgather.domain.upload.domain.FilePathGenerator.generateContentsFilePath;
import static com.forgather.domain.upload.domain.UploadCategory.GUESTBOOK;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class GuestBookService {

    private final SpaceRepository spaceRepository;
    private final GuestRepository guestRepository;
    private final GuestBookCardRepository guestBookCardRepository;
    private final GuestBookCardPhotoRepository guestBookCardPhotoRepository;
    private final ContentsStorage  contentsStorage;

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
}
