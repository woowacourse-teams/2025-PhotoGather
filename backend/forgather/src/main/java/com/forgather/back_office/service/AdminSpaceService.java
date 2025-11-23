package com.forgather.back_office.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.forgather.back_office.dto.AdminSpaceResponse;
import com.forgather.back_office.dto.SpaceDetailResponse;
import com.forgather.back_office.model.AdminUser;
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
    public AdminSpaceResponse getAllSpaces(Pageable pageable, AdminUser adminUser) {
        // TODO: 관리자 권한에 따른 호출 여부 로직 추가 가능성이 있음
        Page<Space> spaces = spaceRepository.findAll(pageable);
        return AdminSpaceResponse.from(spaces);
    }

    @Transactional(readOnly = true)
    public SpaceDetailResponse getSpaceDetail(String spaceCode, AdminUser adminUser) {
        Space space = spaceRepository.getByCodeOrThrow(spaceCode);
        boolean hasProduct = !productRepository.findAllBySpace(space)
            .isEmpty();
        Long guestBookCardCount = guestBookCardRepository.countBySpace(space);

        return SpaceDetailResponse.of(space, hasProduct, guestBookCardCount);
    }
}
