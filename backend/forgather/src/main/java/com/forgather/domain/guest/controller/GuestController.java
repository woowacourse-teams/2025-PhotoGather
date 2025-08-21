package com.forgather.domain.guest.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.forgather.domain.guest.dto.CreateGuestRequest;
import com.forgather.domain.guest.dto.GuestResponse;
import com.forgather.domain.guest.dto.UpdateGuestRequest;
import com.forgather.domain.guest.service.GuestService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/spaces/{spaceCode}/guests")
@Tag(name = "Guest: 게스트", description = "게스트 관련 API")
public class GuestController {

    private final GuestService guestService;

    @GetMapping("/{guestId}")
    @Operation(
        summary = "게스트 조회",
        description = "스페이스 코드와 게스트 ID를 통해 게스트 정보를 조회합니다."
    )
    public ResponseEntity<GuestResponse> getGuest(
        @PathVariable String spaceCode,
        @PathVariable Long guestId
    ) {
        var response = guestService.getGuest(spaceCode, guestId);
        return ResponseEntity.ok(response);
    }

    @PostMapping
    @Operation(
        summary = "게스트 생성",
        description = "스페이스 코드에 새로운 게스트를 생성합니다. " +
            "성공 시, 생성된 게스트 정보를 반환합니다."
    )
    public ResponseEntity<GuestResponse> createGuest(
        @PathVariable String spaceCode,
        @RequestBody CreateGuestRequest request
    ) {
        var response = guestService.createGuest(spaceCode, request);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @PatchMapping("/{guestId}")
    @Operation(
        summary = "게스트 정보 수정",
        description = "스페이스 코드와 게스트 ID를 통해 게스트 정보를 수정합니다. " +
            "성공 시, 수정된 게스트 정보를 반환합니다."
    )
    public ResponseEntity<GuestResponse> updateGuest(
        @PathVariable String spaceCode,
        @PathVariable Long guestId,
        @RequestBody UpdateGuestRequest request
    ) {
        var response = guestService.updateGuest(spaceCode, guestId, request);
        return ResponseEntity.ok(response);
    }
}
