package com.forgather.domain.product.model;

import org.springframework.http.HttpStatus;

import com.forgather.domain.model.BaseTimeEntity;
import com.forgather.domain.space.model.Space;
import com.forgather.global.exception.BaseException;
import com.forgather.global.exception.BaseNullPointerException;
import com.forgather.global.util.TextLengthCounter;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Product extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "space_id", nullable = false)
    private Space space;

    @Column(name = "title", nullable = false)
    private String title;

    @Column(name = "category", nullable = false)
    private String category;

    @Column(name = "author_name", nullable = false)
    private String authorName;

    @Column(name = "description", length = 2000, nullable = false)
    private String description;

    @Column(name = "video_url", nullable = false)
    private String videoUrl;

    @Column(name = "is_video_after_photo", nullable = false)
    private boolean isVideoAfterPhoto;

    /**
     * 임베드 영상 추가에 따른 생성자 오버라이드
     *
     * @param space       작품이 속한 스페이스 (필수)
     * @param title       작품명 (필수, 최대 50자)
     * @param category    카테고리 (선택, 최대 20자)
     * @param authorName  작가명 (선택, 최대 35자)
     * @param description 작품 설명 (필수, 최대 2000자)
     * @param videoUrl 임베드 영상 링크 (선택, 최대 255자)
     * @param isVideoAfterPhoto 영상이 사진 뒤에 오는지 여부 (선택)
     *
     * @throws BaseNullPointerException 필수 필드가 null인 경우
     * @throws BaseException            필드 값이 유효하지 않은 경우
     */
    public Product(Space space, String title, String category, String authorName, String description, String videoUrl,
        Boolean isVideoAfterPhoto) {
        validateRequiredFields(space, title, category, authorName, description, videoUrl, isVideoAfterPhoto);
        validateTitle(title);
        validateCategory(category);
        validateAuthorName(authorName);
        validateDescription(description);
        validateVideoUrl(videoUrl);
        this.space = space;
        this.title = title;
        this.category = convertBlankToEmptyString(category);
        this.authorName = convertBlankToEmptyString(authorName);
        this.description = description;
        this.videoUrl = convertBlankToEmptyString(videoUrl);
        this.isVideoAfterPhoto = isVideoAfterPhoto;
    }

    private void validateRequiredFields(
        Space space,
        String title,
        String category,
        String authorName,
        String description,
        String videoUrl,
        Boolean isVideoAfterPhoto
    ) {
        if (space == null) {
            throw new BaseNullPointerException("스페이스는 null일 수 없습니다.");
        }
        if (title == null) {
            throw new BaseNullPointerException("작품명은 null일 수 없습니다.", HttpStatus.BAD_REQUEST);
        }
        if (category == null) {
            throw new BaseNullPointerException("작품 카테고리는 null일 수 없습니다.", HttpStatus.BAD_REQUEST);
        }
        if (authorName == null) {
            throw new BaseNullPointerException("작가명은 null일 수 없습니다.", HttpStatus.BAD_REQUEST);
        }
        if (description == null) {
            throw new BaseNullPointerException("작품 설명은 null일 수 없습니다.", HttpStatus.BAD_REQUEST);
        }
        if (videoUrl == null) {
            throw new BaseNullPointerException("임베드 영상 링크는 null일 수 없습니다.", HttpStatus.BAD_REQUEST);
        }
        if (isVideoAfterPhoto == null) {
            throw new BaseNullPointerException("임베드 영상 위치는 null일 수 없습니다.", HttpStatus.BAD_REQUEST);
        }
    }

    /**
     * 임베드 영상 추가에 따른 오버라이드
     *
     * 작품 정보를 부분 업데이트합니다.
     * null인 필드는 업데이트하지 않습니다.
     *
     * @param title       작품명 (선택)
     * @param category    카테고리 (선택)
     * @param authorName  작가명 (선택)
     * @param description 작품 설명 (선택)
     * @param videoUrl 임베드 영상 링크 (선택)
     * @param isVideoAfterPhoto 영상이 사진 뒤에 오는지 여부 (선택)
     * @throws BaseException 필드 값이 유효하지 않은 경우
     */
    public void update(String title, String category, String authorName, String description, String videoUrl,
        Boolean isVideoAfterPhoto) {
        if (title != null) {
            validateTitle(title);
            this.title = title;
        }
        if (category != null) {
            validateCategory(category);
            this.category = convertBlankToEmptyString(category);
        }
        if (authorName != null) {
            validateAuthorName(authorName);
            this.authorName = convertBlankToEmptyString(authorName);
        }
        if (description != null) {
            validateDescription(description);
            this.description = description;
        }
        if (videoUrl != null) {
            validateVideoUrl(videoUrl);
            this.videoUrl = convertBlankToEmptyString(videoUrl);
        }
        if (isVideoAfterPhoto != null) {
            this.isVideoAfterPhoto = isVideoAfterPhoto;
        }
    }

    private void validateTitle(String title) {
        if (title.isBlank()) {
            throw new BaseException("작품명은 공백만 입력할 수 없습니다.");
        }
        if (TextLengthCounter.count(title) > 50) {
            throw new BaseException("작품명은 최대 50자까지 입력 가능합니다.");
        }
    }

    private void validateCategory(String category) {
        if (TextLengthCounter.count(category) > 20) {
            throw new BaseException("작품 카테고리는 최대 20자까지 입력 가능합니다.");
        }
    }

    private void validateAuthorName(String authorName) {
        if (TextLengthCounter.count(authorName) > 35) {
            throw new BaseException("작가명은 최대 35자까지 입력 가능합니다.");
        }
    }

    private void validateDescription(String description) {
        if (description.isBlank()) {
            throw new BaseException("작품 설명은 공백만 입력할 수 없습니다.");
        }
        if (TextLengthCounter.count(description) > 2000) {
            throw new BaseException("작품 설명은 최대 2000자까지 입력 가능합니다.");
        }
    }

    private void validateVideoUrl(String videoUrl) {
        if (TextLengthCounter.count(videoUrl) > 512) {
            throw new BaseException("임베드 영상 링크는 최대 512자까지 입력 가능합니다.");
        }
    }

    private String convertBlankToEmptyString(String string) {
        if (string.isBlank()) {
            return "";
        }
        return string;
    }
}
