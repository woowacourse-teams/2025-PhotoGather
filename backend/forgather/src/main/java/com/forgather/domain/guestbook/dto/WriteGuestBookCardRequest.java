package com.forgather.domain.guestbook.dto;

import java.util.List;

import com.forgather.domain.guestbook.model.Guest;
import com.forgather.domain.guestbook.model.GuestBookCard;
import com.forgather.domain.space.model.Space;

import io.swagger.v3.oas.annotations.media.Schema;

public record WriteGuestBookCardRequest(

    @Schema(description = "방문자 닉네임", example = "밍퐁루블", maxLength = 10)
    String nickname,

    @Schema(description = "메세지", example = "전시 잘봤다~~ 너가 최고야 🤙", maxLength = 300)
    String message,

    @Schema(description = "방명록 카드 사진 목록", example = """
        [
            {
                "originalName": "photo1.jpg",
                "uploadFileName": "abc.jpg",
                "capacity": 1024
            },
            {
                "originalName": "photo2.jpg",
                "uploadFileName": "def.jpg",
                "capacity": 2048
            },
            {
                "originalName": "photo3.jpg",
                "uploadFileName": "ghi.jpg",
                "capacity": 4096
            }
        ]
        """)
    List<WriteGuestBookCardPhotoRequest> photos
) {

    public GuestBookCard toEntity(Space space, Guest guest) {
        return new GuestBookCard(space, guest, message);
    }
}
