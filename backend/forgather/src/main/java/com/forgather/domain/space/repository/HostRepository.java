package com.forgather.domain.space.repository;

import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.forgather.global.auth.model.Host;
import com.forgather.global.exception.BaseException;
import com.forgather.global.exception.NotFoundException;

public interface HostRepository {

    Host save(Host host);

    Optional<Host> findById(Long id);

    Page<Host> findAll(Pageable pageable);

    default Host getByIdOrThrow(Long id) {
        if (id ==  null) {
            throw new BaseException("호스트의 id는 null일 수 없습니다. id: " + id);
        }
        return findById(id)
            .orElseThrow(() -> new NotFoundException("존재하지 않는 호스트입니다. id: " + id));
    }
}

