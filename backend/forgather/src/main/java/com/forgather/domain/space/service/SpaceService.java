package com.forgather.domain.space.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

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

    public CreateSpaceResponse create(CreateSpaceRequest request, MultipartFile file, Host host) {
        String spaceCode = codeGenerator.generate(10);
        // TODO: 스페이스 프로필 저장 후 url 반환해서 전달
        String pictureUrl = "temp";
        Space space = spaceRepository.save(request.toEntity(spaceCode, pictureUrl, host));
        return CreateSpaceResponse.from(space);
    }

    public SpaceResponse getSpaceInformation(String spaceCode) {
        Space space = spaceRepository.getByCode(spaceCode);
        return SpaceResponse.from(space);
    }

    @Transactional
    public SpaceResponse update(String spaceCode, UpdateSpaceRequest request, Host host) {
        Space space = spaceRepository.getByCode(spaceCode);
        space.validateHost(host);
        // TODO: update space

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
