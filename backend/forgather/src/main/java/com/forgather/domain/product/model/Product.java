package com.forgather.domain.product.model;

import com.forgather.domain.model.BaseTimeEntity;
import com.forgather.domain.space.model.Space;
import com.forgather.global.exception.BaseException;
import com.forgather.global.exception.BaseNullPointerException;

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

    @Column(name = "title")
    private String title;

    @Column(name = "category")
    private String category;

    @Column(name = "author_name")
    private String authorName;

    @Column(name = "description")
    private String description;

    public Product(Space space, String title, String category, String authorName, String description) {
        validateSpace(space);
        validateTitle(title);
        validateCategory(category);
        validateAuthorName(authorName);
        validateDescription(description);
        this.space = space;
        this.title = title;
        this.category = category;
        this.authorName = authorName;
        this.description = description;
    }

    public void update(String title, String category, String authorName, String description) {
        validateTitle(title);
        validateCategory(category);
        validateAuthorName(authorName);
        validateDescription(description);
        if (title != null) this.title = title;
        if (category != null) this.category = category;
        if (authorName != null) this.authorName = authorName;
        if (description != null) this.description = description;
    }

    private void validateSpace(Space space) {
        if (space == null) {
            throw new BaseNullPointerException("스페이스는 null일 수 없습니다.");
        }
    }

    private void validateTitle(String title) {
        if (title != null && title.length() > 50) {
            throw new BaseException("작품명은 최대 50자입니다. title.length(): " + title.length());
        }
    }

    private void validateCategory(String category) {
        if (category != null && category.length() > 20) {
            throw new BaseException("작품 카테고리는 최대 20자입니다. category.length(): " + category.length());
        }
    }

    private void validateAuthorName(String authorName) {
        if (authorName != null && authorName.length() > 20) {
            throw new BaseException("작가명은 최대 20자입니다. authorName.length(): " + authorName.length());
        }
    }

    private void validateDescription(String description) {
        if (description != null && description.length() > 1000) {
            throw new BaseException("작품 설명은 최대 1000자입니다. description.length(): " + description.length());
        }
    }
}
