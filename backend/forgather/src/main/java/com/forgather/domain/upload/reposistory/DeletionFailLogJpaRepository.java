package com.forgather.domain.upload.reposistory;

import org.springframework.data.jpa.repository.JpaRepository;

import com.forgather.domain.upload.domain.DeletionFailLog;

public interface DeletionFailLogJpaRepository extends JpaRepository<DeletionFailLog, Long>, DeletionFailLogRepository {
}
