package com.forgather.domain.upload.event;

import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Component;
import org.springframework.transaction.event.TransactionPhase;
import org.springframework.transaction.event.TransactionalEventListener;

import com.forgather.domain.upload.domain.ContentsStorage;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import software.amazon.awssdk.core.exception.SdkClientException;

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
        log.info("클라우드 저장소 사진 삭제 시작 - 대상: {}개", event.getPhotos().size());
        try {
            contentsStorage.deletePhotos(event.getPhotos());
        } catch (SdkClientException e) {
            log.warn("클라우드 저장소 사진 삭제 실패 - 대상: {}개", event.getPhotos().size(), e);
        }
        log.info("클라우드 저장소 사진 삭제 완료 - {}개", event.getPhotos().size());
    }
}
