package com.forgather.domain.upload.event;

import static com.forgather.fixture.GuestBookCardPhotoFixture.createGuestBookCardPhoto;
import static java.time.Duration.ofSeconds;
import static org.awaitility.Awaitility.await;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;

import java.util.List;

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

@SpringBootTest
class DeletePhotoEventListenerTest {

    @Autowired
    private ApplicationEventPublisher applicationEventPublisher;

    @Autowired
    private PlatformTransactionManager transactionManager;

    @MockitoBean
    private ContentsStorage contentsStorage;

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
            .atMost(ofSeconds(3))
            .untilAsserted(() ->
                verify(contentsStorage, times(1)).deletePhotos(deletePhotos)
            );
    }

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
            .atMost(ofSeconds(3))
            .untilAsserted(() ->
                verify(contentsStorage, times(0)).deletePhotos(deletePhotos)
            );
    }
}
