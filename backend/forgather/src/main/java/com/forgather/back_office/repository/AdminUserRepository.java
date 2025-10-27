package com.forgather.back_office.repository;

import java.util.Optional;

import com.forgather.back_office.model.AdminUser;

public interface AdminUserRepository {

    AdminUser save(AdminUser adminUser);

    Optional<AdminUser> findByUsername(String username);
}
