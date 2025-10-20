package com.forgather.domain.upload.reposistory;

import com.forgather.domain.upload.domain.DeletionFailLog;

public interface DeletionFailLogRepository {

    DeletionFailLog save(DeletionFailLog deletionFailLog);
}
