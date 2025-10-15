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
     * AFTER_COMMIT으로 이벤트 발행부의 트랜잭션이 커밋된 후 동작합니다.
     * 비동기로 별도 스레드에서 실행되며 기존 트랜잭션 컨텍스트를 공유하지 않습니다.
     */
    @Async
    @TransactionalEventListener(phase = TransactionPhase.AFTER_COMMIT)
    public void delete(DeletePhotoEvent event) {
        log.info("클라우드 저장소 사진 삭제 시작 - 대상: {}개", event.getPhotos().size());
        try {
            contentsStorage.deletePhotos(event.getPhotos());
        } catch (SdkClientException e) {
            log.warn("클라우드 저장소 사진 삭제 실패 - 대상: {}개", event.getPhotos().size(), e);
            return;
        }
        log.info("클라우드 저장소 사진 삭제 완료 - {}개", event.getPhotos().size());
    }
}
