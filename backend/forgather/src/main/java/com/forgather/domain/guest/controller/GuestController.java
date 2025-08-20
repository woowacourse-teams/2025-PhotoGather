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

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/spaces/{spaceCode}/guests")
public class GuestController {

    private final GuestService guestService;

    @GetMapping("/{guestId}")
    public ResponseEntity<GuestResponse> getGuest(
        @PathVariable String spaceCode,
        @PathVariable Long guestId
    ) {
        var response = guestService.getGuest(spaceCode, guestId);
        return ResponseEntity.ok(response);
    }

    @PostMapping
    public ResponseEntity<GuestResponse> createGuest(
        @PathVariable String spaceCode,
        @RequestBody CreateGuestRequest request
    ) {
        var response = guestService.createGuest(spaceCode, request);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @PatchMapping("/{guestId}")
    public ResponseEntity<GuestResponse> updateGuest(
        @PathVariable String spaceCode,
        @PathVariable Long guestId,
        @RequestBody UpdateGuestRequest request
    ) {
        var response = guestService.updateGuest(spaceCode, guestId, request);
        return ResponseEntity.ok(response);
    }
}
