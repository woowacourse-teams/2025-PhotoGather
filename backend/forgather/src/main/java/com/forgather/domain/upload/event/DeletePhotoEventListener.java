package com.forgather.domain.upload.event;

import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Component;
import org.springframework.transaction.event.TransactionPhase;
import org.springframework.transaction.event.TransactionalEventListener;

import com.forgather.domain.upload.domain.ContentsStorage;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequiredArgsConstructor
@Component
public class DeletePhotoEventListener {

    private final ContentsStorage contentsStorage;

    /**
     * 해당 작업은 기존 트랜잭션을 필요로 하면 안됨
     */
    @Async
    @TransactionalEventListener(phase = TransactionPhase.AFTER_COMMIT)
    public void delete(DeletePhotoEvent event) {
        contentsStorage.deletePhotos(event.getPhotos());
    }
}
