export const INFORMATION = {
  SPACE_CREATE: {
    NAME: {
      TITLE: '전시 공간의 이름을 작성해주세요',
      DESCRIPTION: '작성한 이름으로 스페이스가 생성돼요.',
    },
    VISIBILITY: {
      TITLE: '방명록 공개 범위를 정해주세요',
      DESCRIPTION: '공개 범위는 언제든 바꿀 수 있어요.',
      ACCESS_TYPE: {
        OPTIONS: {
          PUBLIC: {
            TITLE: '공개',
            DESCRIPTION: '누구나 방명록을 볼 수 있어요.',
          },
          PRIVATE: {
            TITLE: '비공개',
            DESCRIPTION: '방명록은 나만 볼 수 있어요.',
          },
        },
      },
    },
    DESCRIPTION: {
      TITLE: '전시 정보를 작성해주세요',
      DESCRIPTION: '방문객에게 전달할 설명을 작성해주세요. (선택)',
      PLACEHOLDER: '방문해주셔서 감사합니다.\n매일 12시 - 16시에 상주합니다.',
    },
    DETAIL: {
      TITLE: '전시 프로필과 SNS를 입력해주세요',
      DESCRIPTION: '스페이스 홈에서 확인할 수 있어요. (선택)',
    },
    CHECK: {
      TITLE: '스페이스 정보를 확인해주세요',
      DESCRIPTION: '생성하기를 누르면 링크가 생성돼요.',
    },
  },
  GUESTBOOK: {
    MESSAGE: {
      PROMPT: '전달할 메세지를 남겨주세요',
      COMPLETE: '방명록 카드를 전달했어요.',
    },
    NICKNAME: {
      PROMPT: '전달할 닉네임을 입력해주세요',
    },
    PHOTOS: {
      PROMPT: '함께 전달할 사진을 선택해주세요',
      UPLOAD_LIMIT_TEXT: '20장까지 선택할 수 있어요',
    },
  },
} as const;
