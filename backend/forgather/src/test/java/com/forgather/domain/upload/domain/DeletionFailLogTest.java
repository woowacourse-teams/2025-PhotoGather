package com.forgather.domain.upload.domain;

import static com.forgather.fixture.ProductPhotoFixture.createProductPhotoWithPathSetId;
import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertAll;

import java.util.List;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import com.forgather.domain.product.model.ProductPhoto;
import com.forgather.domain.upload.event.DeletePhotoEvent;

class DeletionFailLogTest {

    @DisplayName("실패한 저장소 삭제 이벤트 정보를 텍스트로 말아 보관한다")
    @Test
    public void create() {
        // given
        ProductPhoto photo1 = createProductPhotoWithPathSetId("forgather/path1/photo1.jpg", 1L);
        ProductPhoto photo2 = createProductPhotoWithPathSetId("forgather/path1/photo2.jpg", 2L);
        ProductPhoto photo3 = createProductPhotoWithPathSetId("forgather/path2/photo3.jpg", 3L);
        ProductPhoto photo4 = createProductPhotoWithPathSetId("forgather/path3/photo4.jpg", 4L);
        DeletePhotoEvent deletePhotoEvent = new DeletePhotoEvent(this, List.of(
            photo1, photo2, photo3, photo4
        ));
        DeletionFailLog deletionFailLog = new DeletionFailLog(deletePhotoEvent);

        // when
        String result = deletionFailLog.getInfo();

        // then
        String[] lines = result.split("\n");
        assertAll(
            () -> assertThat(lines).hasSize(4),
            () -> assertThat(lines[0]).isEqualTo("ProductPhoto, id:1, path:forgather/path1/photo1.jpg"),
            () -> assertThat(lines[1]).isEqualTo("ProductPhoto, id:2, path:forgather/path1/photo2.jpg"),
            () -> assertThat(lines[2]).isEqualTo("ProductPhoto, id:3, path:forgather/path2/photo3.jpg"),
            () -> assertThat(lines[3]).isEqualTo("ProductPhoto, id:4, path:forgather/path3/photo4.jpg")
        );
    }

}
