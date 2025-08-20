package com.forgather.domain.space.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.forgather.domain.space.dto.CreateSpaceRequest;
import com.forgather.domain.space.dto.CreateSpaceResponse;
import com.forgather.domain.space.dto.SpaceResponse;
import com.forgather.domain.space.dto.UpdateSpaceRequest;
import com.forgather.domain.space.model.Space;
import com.forgather.domain.space.repository.SpaceRepository;
import com.forgather.global.auth.model.Host;
import com.forgather.global.util.RandomCodeGenerator;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class SpaceService {

    private final SpaceRepository spaceRepository;
    private final RandomCodeGenerator codeGenerator;

    public CreateSpaceResponse create(CreateSpaceRequest request, Host host) {
        String spaceCode = codeGenerator.generate(10);
        Space space = spaceRepository.save(request.toEntity(spaceCode, host));
        return CreateSpaceResponse.from(space);
    }

    public SpaceResponse getSpaceInformation(String spaceCode) {
        Space space = spaceRepository.getByCode(spaceCode);
        return SpaceResponse.from(space);
    }

    @Transactional
    public SpaceResponse update(String spaceCode, UpdateSpaceRequest request, Long hostId) {
        // TODO: hostId가 해당 스페이스의 소유자인지 검증하는 로직 추가 필요
        Space space = spaceRepository.getByCode(spaceCode);
        space.update(
            request.name(),
            request.validHours(),
            request.openedAt(),
            request.password()
        );

        return SpaceResponse.from(space);
    }

    @Transactional
    public void delete(String spaceCode, Long hostId) {
        // TODO: hostId가 Space의 HostId와 일치하는지 검증 로직 추가 필요
        Space space = spaceRepository.getByCode(spaceCode);
        spaceRepository.delete(space);
    }
}
