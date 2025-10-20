package com.forgather.domain.upload.event;

import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Component;
import org.springframework.transaction.event.TransactionPhase;
import org.springframework.transaction.event.TransactionalEventListener;

import com.forgather.domain.upload.domain.ContentsStorage;
import com.forgather.domain.upload.domain.DeletionFailLog;
import com.forgather.domain.upload.reposistory.DeletionFailLogRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequiredArgsConstructor
@Component
public class DeletePhotoEventListener {

    private static final int MAX_RETRY_COUNT = 1;
    private static final long RETRY_DELAY_MS = 2000;

    private final ContentsStorage contentsStorage;
    private final DeletionFailLogRepository failLogRepository;

    /**
     * AFTER_COMMIT으로 이벤트 발행부의 트랜잭션이 커밋된 후 동작합니다.
     * 비동기로 별도 스레드에서 실행되며 기존 트랜잭션 컨텍스트를 공유하지 않습니다.
     * <p>
     */
    @Async
    @TransactionalEventListener(phase = TransactionPhase.AFTER_COMMIT)
    public void delete(DeletePhotoEvent event) {
        log.info("저장소 사진 삭제 시작 - 대상: {}개", event.getPhotos().size());
        try {
            contentsStorage.deletePhotos(event.getPhotos());
            log.info("저장소 사진 삭제 완료 - 대상: {}개", event.getPhotos().size());
        } catch (Exception e) {
            log.warn("저장소 사진 삭제 실패 - 대상: {}개", event.getPhotos().size(), e);
            retry(event, 1);
        }
    }

    private void retry(DeletePhotoEvent event, int retryCount) {
        if (retryCount > MAX_RETRY_COUNT) {
            log.error("저장소 사진 삭제 최종 실패 (재시도 {}회) - 대상: {}개", retryCount - 1, event.getPhotos().size());
            saveFailLog(event);
            return;
        }
        try {
            Thread.sleep(RETRY_DELAY_MS); // 재시도 시 2초 대기

            log.info("저장소 사진 삭제 재시도 ({}/{}회) - 대상: {}개", retryCount, MAX_RETRY_COUNT, event.getPhotos().size());
            contentsStorage.deletePhotos(event.getPhotos());
            log.info("저장소 사진 삭제 재시도 성공 ({}/{}회) - 대상: {}개", retryCount, MAX_RETRY_COUNT, event.getPhotos().size());
        } catch (InterruptedException e) { // Thread.sleep 중 인터럽트 발생 시
            log.warn("저장소 사진 삭제 재시도 중 인터럽트 발생 - 대상: {}개", event.getPhotos().size(), e);
            saveFailLog(event);
            Thread.currentThread().interrupt();
        } catch (Exception e) {
            log.warn("저장소 사진 삭제 재시도 실패 ({}/{}회) - 대상: {}개", retryCount, MAX_RETRY_COUNT, event.getPhotos().size(), e);
            retry(event, retryCount + 1);
        }
    }

    private void saveFailLog(DeletePhotoEvent event) {
        try {
            log.info("저장소 사진 삭제 실패 로그 db 저장 시작 - 대상: {}개", event.getPhotos().size());
            failLogRepository.save(new DeletionFailLog(event));
        } catch (Exception e) {
            log.atError()
                .addKeyValue("photos", event.getPhotos())
                .log("저장소 사진 삭제 실패 로그 db 저장 실패 - 대상: {}개", event.getPhotos().size(), e);
        }
    }
}
