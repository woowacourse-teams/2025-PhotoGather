package com.forgather.back_office.service;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.forgather.back_office.dto.AdminHostResponse;
import com.forgather.back_office.dto.HostDetailResponse;
import com.forgather.back_office.model.AdminUser;
import com.forgather.domain.space.repository.HostRepository;
import com.forgather.global.auth.model.Host;
import com.forgather.global.auth.repository.SpaceHostMapRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AdminHostService {

    private final HostRepository hostRepository;
    private final SpaceHostMapRepository spaceHostMapRepository;

    @Transactional(readOnly = true)
    public AdminHostResponse getAllHosts(Pageable pageable, AdminUser adminUser) {
        Page<Host> hosts = hostRepository.findAll(pageable);
        return AdminHostResponse.from(hosts.map(host -> {
            List<Long> spaceIds = spaceHostMapRepository.findAllByHostWithSpaceOrderByCreatedAtDesc(host)
                .stream()
                .map(spaceHostMap -> spaceHostMap.getSpace().getId())
                .toList();
            return HostDetailResponse.of(host, spaceIds);
        }));
    }
}
