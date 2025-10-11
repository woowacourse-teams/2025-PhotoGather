package com.forgather.domain.guestbook.controller;

import static software.amazon.awssdk.http.HttpStatusCode.CREATED;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.forgather.domain.guestbook.dto.WriteGuestBookCardRequest;
import com.forgather.domain.guestbook.dto.WriteGuestBookCardResponse;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Tag(name = "GuestBook: 방명록", description = "방명록 관련 API")
@Slf4j
@RequiredArgsConstructor
@RequestMapping("/spaces/{spaceCode}/guestbook")
@RestController
public class GuestBookController {

    /**
     * TODO
     * 페이지네이션
     * 읽음/안읽음 여부 (호스트)
     * 사진 존재 여부
     */
    @GetMapping
    public void getCards() {
        return;
    }

    /**
     * TODO
     * 읽음 처리 (호스트)
     * 사진
     */
    @GetMapping("/{guestBookCardId}")
    public void getCard() {
        return;
    }

    /**
     * TODO
     */
    @Operation(summary = "방명록 카드 작성", description = "방문자 닉네임(10자), 메세지(300자)")
    @PostMapping
    public ResponseEntity<WriteGuestBookCardResponse> writeCard(
        @PathVariable(value = "spaceCode") String spaceCode,
        @RequestBody WriteGuestBookCardRequest request
    ) {
        return ResponseEntity.status(CREATED).body(null);
    }

    /**
     * TODO
     * 호스트 검증
     */
    @Operation(summary = "방명록 카드 삭제 (호스트)")
    @DeleteMapping("/{guestBookCardId}")
    public ResponseEntity<Void> deleteCard(
        @PathVariable(value = "guestBookCardId") Long guestBookCardId
    ) {
        return ResponseEntity.noContent().build();
    }

    /**
     * TODO
     * 호스트 검증
     */
    @DeleteMapping("/{guestBookCardId}/photos")
    public void deleteCardPhotos() {
        return;
    }
}
