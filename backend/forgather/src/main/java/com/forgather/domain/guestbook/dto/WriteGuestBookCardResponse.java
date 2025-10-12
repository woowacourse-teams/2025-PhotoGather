package com.forgather.domain.guestbook.dto;

import java.util.List;

import com.forgather.domain.guestbook.model.GuestBookCard;
import com.forgather.domain.guestbook.model.GuestBookCardPhoto;

import io.swagger.v3.oas.annotations.media.Schema;

public record WriteGuestBookCardResponse(

    @Schema(example = "1")
    Long id,

    @Schema(example = "밍퐁루블")
    String nickname,

    @Schema(example = "전시 잘봤다~~ 너가 최고야 🤙")
    String message,

    @Schema(description = "방명록 카드 사진 목록", example = """
        [
            {
                "id": 1,
                "originalName": "photo1.jpg",
                "path": "photogather/v2/spaces/1234567890/guestbook/abc.jpg"
            },
            {
                "id": 2,
                "originalName": "photo2.jpg",
                "path": "photogather/v2/spaces/1234567890/guestbook/def.jpg"
            },
            {
                "id": 3,
                "originalName": "photo3.jpg",
                "path": "photogather/v2/spaces/1234567890/guestbook/ghi.jpg"
            }
        ]
        """)
    List<GuestBookCardPhotoResponse> photos
) {

    public WriteGuestBookCardResponse(GuestBookCard guestBookCard, List<GuestBookCardPhoto> photos) {
        this(
            guestBookCard.getId(),
            guestBookCard.getGuestNickname(),
            guestBookCard.getMessage(),
            photos.stream().map(GuestBookCardPhotoResponse::new).toList()
        );
    }
}
