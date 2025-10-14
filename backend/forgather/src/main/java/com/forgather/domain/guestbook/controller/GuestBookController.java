package com.forgather.domain.guestbook.controller;

import static software.amazon.awssdk.http.HttpStatusCode.CREATED;

import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.forgather.domain.guestbook.dto.DeleteGuestBookCardPhotosRequest;
import com.forgather.domain.guestbook.dto.GuestBookCardResponse;
import com.forgather.domain.guestbook.dto.GuestBookResponse;
import com.forgather.domain.guestbook.dto.WriteGuestBookCardRequest;
import com.forgather.domain.guestbook.dto.WriteGuestBookCardResponse;
import com.forgather.domain.guestbook.service.GuestBookService;
import com.forgather.global.auth.annotation.LoginHost;
import com.forgather.global.auth.model.Host;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Tag(name = "GuestBook: 방명록", description = "방명록 관련 API")
@Slf4j
@RequiredArgsConstructor
@RequestMapping("/spaces/{spaceCode}/guestbook")
@RestController
public class GuestBookController {

    private final GuestBookService guestBookService;

    /**
     * TODO
     * 공개 검증 (게스트)
     * 페이지네이션
     * 읽음/안읽음 여부 (호스트)
     * 사진 존재 여부
     */
    @Operation(summary = "방명록 조회", description = "페이지네이션 1페이지부터 시작 / 공개 스페이스가 아닌 경우 호스트만 조회 가능")
    @GetMapping
    public ResponseEntity<GuestBookResponse> getCards(
        @PathVariable(value = "spaceCode") String spaceCode,
        @Schema(example = """
            {
              "page": 1,
              "size": 15,
              "sort": [
                "createdAt", "id"
              ]
            }
            """)
        @PageableDefault(size = 15, sort = {"createdAt", "id"}, direction = Sort.Direction.DESC) Pageable pageable
    ) {
        return ResponseEntity.ok(null);
    }

    @Operation(summary = "방명록 카드 조회", description = "공개 스페이스가 아닌 경우 호스트만 조회 가능")
    @GetMapping("/{guestBookCardId}")
    public ResponseEntity<GuestBookCardResponse> readCard(
        @PathVariable(value = "spaceCode") String spaceCode,
        @PathVariable(value = "guestBookCardId") Long guestBookCardId,
        @LoginHost(required = false) Host host
    ) {
        GuestBookCardResponse response = guestBookService.readCard(host, spaceCode, guestBookCardId);
        return ResponseEntity.ok(response);
    }

    @Operation(summary = "방명록 카드 작성", description = "방문자 닉네임(10자), 메세지(300자)")
    @PostMapping
    public ResponseEntity<WriteGuestBookCardResponse> writeCard(
        @PathVariable(value = "spaceCode") String spaceCode,
        @RequestBody WriteGuestBookCardRequest request
    ) {
        var response = guestBookService.writeCard(spaceCode, request);
        return ResponseEntity.status(CREATED).body(response);
    }

    @Operation(summary = "방명록 카드 삭제 (호스트)")
    @DeleteMapping("/{guestBookCardId}")
    public ResponseEntity<Void> deleteCard(
        @PathVariable(value = "spaceCode") String spaceCode,
        @PathVariable(value = "guestBookCardId") Long guestBookCardId,
        @LoginHost(required = false) Host host // TODO true로 전환
    ) {
        guestBookService.deleteCard(host, spaceCode, guestBookCardId);
        return ResponseEntity.noContent().build();
    }

    @Operation(summary = "방명록 카드 사진 선택 삭제 (호스트)")
    @DeleteMapping("/{guestBookCardId}/photos")
    public ResponseEntity<Void> deleteCardPhotos(
        @PathVariable(value = "spaceCode") String spaceCode,
        @PathVariable(value = "guestBookCardId") Long guestBookCardId,
        @RequestBody DeleteGuestBookCardPhotosRequest request,
        @LoginHost(required = false) Host host // TODO true로 전환
    ) {
        guestBookService.deleteCardPhotos(host, spaceCode, guestBookCardId, request);
        return ResponseEntity.noContent().build();
    }
}
