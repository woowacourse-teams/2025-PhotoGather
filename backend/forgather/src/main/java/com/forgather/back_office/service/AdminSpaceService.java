package com.forgather.back_office.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.forgather.back_office.dto.AdminSpaceResponse;
import com.forgather.back_office.model.AdminUser;
import com.forgather.domain.space.model.Space;
import com.forgather.domain.space.repository.SpaceRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AdminSpaceService {

    private final SpaceRepository spaceRepository;

    public AdminSpaceResponse getAllSpaces(Pageable pageable, AdminUser adminUser) {
        // TODO: 관리자 권한에 따른 호출 여부 로직 추가 가능성이 있음
        Page<Space> spaces = spaceRepository.findAll(pageable);
        return AdminSpaceResponse.from(spaces);
    }
}
