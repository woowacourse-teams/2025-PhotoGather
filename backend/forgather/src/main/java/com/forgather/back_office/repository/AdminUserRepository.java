package com.forgather.back_office.repository;

import java.util.Optional;

import com.forgather.back_office.model.AdminUser;

public interface AdminUserRepository {
    Optional<AdminUser> findByUsername(String username);
}
