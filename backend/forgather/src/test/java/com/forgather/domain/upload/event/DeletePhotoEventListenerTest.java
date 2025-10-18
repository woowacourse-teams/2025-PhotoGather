package com.forgather.domain.upload.event;

import static com.forgather.fixture.GuestBookCardPhotoFixture.createGuestBookCardPhoto;
import static java.time.Duration.ofSeconds;
import static org.awaitility.Awaitility.await;
import static org.mockito.ArgumentMatchers.anyList;
import static org.mockito.Mockito.doThrow;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;

import java.util.List;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.transaction.PlatformTransactionManager;
import org.springframework.transaction.TransactionStatus;
import org.springframework.transaction.support.DefaultTransactionDefinition;

import com.forgather.domain.guestbook.model.GuestBookCardPhoto;
import com.forgather.domain.upload.domain.ContentsStorage;

import software.amazon.awssdk.core.exception.SdkClientException;

@SpringBootTest
class DeletePhotoEventListenerTest {

    @Autowired
    private ApplicationEventPublisher applicationEventPublisher;

    @Autowired
    private PlatformTransactionManager transactionManager;

    @MockitoBean
    private ContentsStorage contentsStorage;

    @DisplayName("트랜잭션이 커밋되면 저장소 사진 삭제 이벤트를 처리한다")
    @Test
    void handleDeletePhotoEventWhenCommit() {
        // given
        List<GuestBookCardPhoto> deletePhotos = List.of(
            createGuestBookCardPhoto(),
            createGuestBookCardPhoto(),
            createGuestBookCardPhoto()
        );
        DeletePhotoEvent event = new DeletePhotoEvent(this, deletePhotos);

        // when
        DefaultTransactionDefinition def = new DefaultTransactionDefinition();
        TransactionStatus status = transactionManager.getTransaction(def);
        applicationEventPublisher.publishEvent(event);
        transactionManager.commit(status);

        // then
        await()
            .atMost(ofSeconds(6))
            .untilAsserted(() ->
                verify(contentsStorage, times(1)).deletePhotos(deletePhotos)
            );
    }

    @DisplayName("저장소 사진 삭제에 실패하면 1회 재시도하여 작업을 최대 2회 수행한다")
    @Test
    void retryDeletePhotoWhenFail() {
        // given
        doThrow(SdkClientException.create("테스트용 예외")).when(contentsStorage).deletePhotos(anyList());

        List<GuestBookCardPhoto> deletePhotos = List.of(
            createGuestBookCardPhoto(),
            createGuestBookCardPhoto(),
            createGuestBookCardPhoto()
        );
        DeletePhotoEvent event = new DeletePhotoEvent(this, deletePhotos);

        // when
        DefaultTransactionDefinition def = new DefaultTransactionDefinition();
        TransactionStatus status = transactionManager.getTransaction(def);
        applicationEventPublisher.publishEvent(event);
        transactionManager.commit(status);

        // then
        await()
            .atMost(ofSeconds(6))
            .untilAsserted(() ->
                verify(contentsStorage, times(2)).deletePhotos(deletePhotos)
            );
    }

    @DisplayName("트랜잭션이 롤백되면 저장소 사진 삭제 이벤트를 처리하지 않는다")
    @Test
    void notHandleDeletePhotoEventWhenRollback() {
        // given
        List<GuestBookCardPhoto> deletePhotos = List.of(
            createGuestBookCardPhoto(),
            createGuestBookCardPhoto(),
            createGuestBookCardPhoto()
        );
        DeletePhotoEvent event = new DeletePhotoEvent(this, deletePhotos);

        // when
        DefaultTransactionDefinition def = new DefaultTransactionDefinition();
        TransactionStatus status = transactionManager.getTransaction(def);
        applicationEventPublisher.publishEvent(event);
        transactionManager.rollback(status);

        // then
        await()
            .atMost(ofSeconds(6))
            .untilAsserted(() ->
                verify(contentsStorage, times(0)).deletePhotos(deletePhotos)
            );
    }
}
