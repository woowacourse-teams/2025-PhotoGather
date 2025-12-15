package com.forgather.back_office.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.forgather.back_office.dto.AdminSpaceFilterRequest;
import com.forgather.back_office.dto.AdminSpaceResponse;
import com.forgather.back_office.dto.SpaceDetailResponse;
import com.forgather.domain.guestbook.repository.GuestBookCardRepository;
import com.forgather.domain.product.repository.ProductRepository;
import com.forgather.domain.space.model.Space;
import com.forgather.domain.space.repository.SpaceRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AdminSpaceService {

    private final SpaceRepository spaceRepository;
    private final ProductRepository productRepository;
    private final GuestBookCardRepository guestBookCardRepository;

    @Transactional(readOnly = true)
    public AdminSpaceResponse getAllSpaces(Pageable pageable) {
        Page<Space> spaces = spaceRepository.findAllByDeletedAtIsNull(pageable);
        return AdminSpaceResponse.from(spaces);
    }

    @Transactional(readOnly = true)
    public SpaceDetailResponse getSpaceDetail(String spaceCode) {
        Space space = spaceRepository.getByCodeAndDeletedAtIsNullOrThrow(spaceCode);
        boolean hasProduct = !productRepository.findAllBySpace(space)
            .isEmpty();
        Long guestBookCardCount = guestBookCardRepository.countBySpace(space);

        return SpaceDetailResponse.of(space, hasProduct, guestBookCardCount);
    }
    
    @Transactional(readOnly = true)
    public AdminSpaceResponse getSpacesByFilters(AdminSpaceFilterRequest request, Pageable pageable) {
        Page<Space> spaces;
        if (request.hasProduct() == null) {
            spaces = spaceRepository.findAllByDeletedAtIsNull(pageable);
            return AdminSpaceResponse.from(spaces);
        }

        spaces = spaceRepository.findAllByDeletedAtIsNullAndProductFilter(request.hasProduct(), pageable);
        return AdminSpaceResponse.from(spaces);
    }
}
