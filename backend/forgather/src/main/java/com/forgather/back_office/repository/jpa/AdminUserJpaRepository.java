package com.forgather.back_office.repository.jpa;

import org.springframework.data.jpa.repository.JpaRepository;

import com.forgather.back_office.model.AdminUser;
import com.forgather.back_office.repository.AdminUserRepository;

public interface AdminUserJpaRepository extends JpaRepository<AdminUser, Long>, AdminUserRepository {
}
