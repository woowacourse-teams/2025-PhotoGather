package com.forgather.back_office.repository;

import java.util.Optional;

import org.springframework.http.HttpStatus;

import com.forgather.back_office.model.AdminUser;
import com.forgather.global.exception.BaseNullPointerException;
import com.forgather.global.exception.NotFoundException;

public interface AdminUserRepository {

    AdminUser save(AdminUser adminUser);

    Optional<AdminUser> findByUsername(String username);

    Optional<AdminUser> findById(Long id);

    default AdminUser getByIdOrThrow(Long id) {
        if (id == null) {
            throw new BaseNullPointerException("어드민유저의 id는 null일 수 없습니다. id: " + id, HttpStatus.BAD_REQUEST);
        }
        return findById(id)
            .orElseThrow(() -> new NotFoundException("존재하지 않는 어드민유저입니다. id: " + id));
    }
}
