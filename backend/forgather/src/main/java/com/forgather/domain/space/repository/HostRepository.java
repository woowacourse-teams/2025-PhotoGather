package com.forgather.domain.space.repository;

import java.util.Optional;

import com.forgather.global.auth.model.Host;
import com.forgather.global.exception.BaseException;
import com.forgather.global.exception.NotFoundException;

public interface HostRepository {

    Host save(Host host);

    Optional<Host> findById(Long id);

    default Host getByIdOrThrow(Long id) {
        if (id ==  null) {
            throw new BaseException("id는 null일 수 없습니다.");
        }
        return findById(id)
            .orElseThrow(() -> new NotFoundException("Host를 찾을 수 없습니다. id: " + id));
    }
}

