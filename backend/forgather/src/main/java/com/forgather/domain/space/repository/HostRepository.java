package com.forgather.domain.space.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.forgather.global.auth.model.Host;
import com.forgather.global.exception.NotFoundException;

public interface HostRepository extends JpaRepository<Host, Long> {

    Optional<Host> findById(Long id);

    default Host getById(Long id) {
        return findById(id)
            .orElseThrow(() -> new NotFoundException("Host를 찾을 수 없습니다. id: " + id));
    }
}
