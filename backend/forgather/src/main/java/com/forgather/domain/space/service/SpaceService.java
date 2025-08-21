package com.forgather.domain.space.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.forgather.domain.space.dto.CreateSpaceRequest;
import com.forgather.domain.space.dto.CreateSpaceResponse;
import com.forgather.domain.space.dto.SpaceCapacityResponse;
import com.forgather.domain.space.dto.SpaceResponse;
import com.forgather.domain.space.dto.UpdateSpaceRequest;
import com.forgather.domain.space.model.Photo;
import com.forgather.domain.space.model.Space;
import com.forgather.domain.space.repository.PhotoRepository;
import com.forgather.domain.space.repository.SpaceRepository;
import com.forgather.global.auth.model.Host;
import com.forgather.global.util.RandomCodeGenerator;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class SpaceService {

    private final SpaceRepository spaceRepository;
    private final PhotoRepository photoRepository;
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

    public SpaceCapacityResponse getSpaceCapacity(String spaceCode, Host host) {
        // TODO: 추후 스페이스가 만료되어 소프트 딜리트 되는 경우 용량 정보 제공 고려
        Space space = spaceRepository.getUnexpiredSpaceByCode(spaceCode);
        space.validateHost(host);
        long usedValue = photoRepository.findAllBySpace(space)
            .stream()
            .mapToLong(Photo::getCapacity)
            .sum();
        return new SpaceCapacityResponse(space.getMaxCapacity(), usedValue);
    }

    @Transactional
    public SpaceResponse update(String spaceCode, UpdateSpaceRequest request, Host host) {
        Space space = spaceRepository.getByCode(spaceCode);
        space.validateHost(host);
        space.update(
            request.name(),
            request.validHours(),
            request.openedAt(),
            request.password()
        );

        return SpaceResponse.from(space);
    }

    @Transactional
    public void delete(String spaceCode, Host host) {
        Space space = spaceRepository.getByCode(spaceCode);
        space.validateHost(host);
        spaceRepository.delete(space);
    }

    public List<SpaceResponse> getSpacesInformation(Host host) {
        return host.getSpaceHostMap().stream()
            .map(spaceHostMap ->
                SpaceResponse.from(spaceHostMap.getSpace())
            )
            .toList();
    }
}
