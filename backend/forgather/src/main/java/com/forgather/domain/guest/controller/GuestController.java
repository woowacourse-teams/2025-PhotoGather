package com.forgather.domain.guest.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
@RequestMapping("/guests")
public class GuestController {

    private final GuestService guestService;

    @PostMapping
    public ResponseEntity<GuestResponse> createGuest(
        @RequestBody CreateGuestRequest request
    ) {
        var response = guestService.createGuest(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @PatchMapping("/{guestId}")
    public ResponseEntity<GuestResponse> updateGuest(
        @PathVariable Long guestId,
        @RequestBody UpdateGuestRequest request
    ) {
        var response = guestService.updateGuest(guestId, request);
        return ResponseEntity.ok(response);
    }
}
