package com.forgather.domain.space.dto;

import java.util.List;

import io.swagger.v3.oas.annotations.media.Schema;

public record HostSpaceResponse(

    @Schema(description = "호스트 스페이스 목록", example = """
        [
            {
               "id": 1,
               "spaceCode": "1234567890",
               "name": "서양화 졸업 전시",
               "description": "나의 서양화 졸업 전시",
               "isPublic": true,
               "instagramUsername": "forgather_official1",
               "email": "forgather1@forgather.me",
               "spacePhoto": {
                 "isExists": true,
                 "path": "photogather/v2/spaces/1234567890/space/profile.png"
               },
               "guestBookCardCount": 15
            },
            {
              "id": 2,
              "spaceCode": "0987654321",
              "name": "동양화 졸업 전시",
              "description": "나의 동양화 졸업 전시",
              "isPublic": true,
              "instagramUsername": "forgather_official2",
              "email": "forgather2@forgather.me",
              "spacePhoto": {
                "isExists": false,
                "path": ""
              },
              "guestBookCardCount": 0
            }
        ]
        """)
    List<SpaceResponse> spaces
) {
}
