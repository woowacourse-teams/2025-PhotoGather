package com.forgather.domain.space.service;

import org.springframework.stereotype.Service;

import com.forgather.domain.space.dto.CreateSpaceRequest;
import com.forgather.domain.space.dto.CreateSpaceResponse;
import com.forgather.domain.space.dto.SpaceResponse;
import com.forgather.domain.space.model.Space;
import com.forgather.domain.space.repository.SpaceRepository;
import com.forgather.global.auth.domain.Host;
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
}
