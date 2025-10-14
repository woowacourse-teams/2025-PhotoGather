package com.forgather.domain.guest.service;

import org.springframework.stereotype.Service;

import com.forgather.domain.guest.dto.CreateGuestRequest;
import com.forgather.domain.guest.dto.GuestResponse;
import com.forgather.domain.guest.dto.UpdateGuestRequest;
import com.forgather.domain.guest.model.Guest;
import com.forgather.domain.guest.repository.GuestRepository;
import com.forgather.domain.space.model.Space;
import com.forgather.domain.space.repository.SpaceRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class GuestService {

    private final GuestRepository guestRepository;
    private final SpaceRepository spaceRepository;

    @Transactional
    public GuestResponse createGuest(String spaceCode, CreateGuestRequest request) {
        Space space = spaceRepository.getByCode(spaceCode);
        Guest guest = guestRepository.save(new Guest(space, request.name()));
        return GuestResponse.from(guest);
    }

    @Transactional
    public GuestResponse updateGuest(String spaceCode, Long guestId, UpdateGuestRequest request) {
        Guest guest = guestRepository.getByIdOrThrow(guestId);
        Space space = guest.getSpace();
        space.validateCode(spaceCode);
        guest.rename(request.name());
        return GuestResponse.from(guest);
    }

    public GuestResponse getGuest(String spaceCode, Long guestId) {
        Guest guest = guestRepository.getByIdOrThrow(guestId);
        Space space = guest.getSpace();
        space.validateCode(spaceCode);
        return GuestResponse.from(guest);
    }
}
