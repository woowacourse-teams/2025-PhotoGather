package com.forgather.domain.guestbook.controller;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
    public void getAll() {
        return;
    }

    /**
     * TODO
     * 읽음 처리 (호스트)
     * 사진
     */
    @GetMapping
    public void get() {
        return;
    }

    /**
     * TODO
     */
    @PostMapping
    public void write() {
        return;
    }

    /**
     * TODO
     * 호스트 검증
     */
    @DeleteMapping
    public void delete() {
        return;
    }

    /**
     * TODO
     * 호스트 검증
     */
    @DeleteMapping
    public void deletePhotos() {
        return;
    }
}
