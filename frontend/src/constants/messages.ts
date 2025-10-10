export const INFORMATION = {
  SPACE_CREATE: {
    NAME: {
      TITLE: '스페이스 이름을 정해주세요',
      DESCRIPTION: '추억을 담을 공간의 이름을 작성해주세요.',
    },
    VISIBILITY: {
      TITLE: '방명록 공개 범위를 정해주세요',
      DESCRIPTION: '공개 범위는 언제든 바꿀 수 있어요.',
      ACCESS_TYPE: {
        OPTIONS: {
          PUBLIC: {
            TITLE: '공개',
            DESCRIPTION: '링크만 있으면 누구나 방명록을 볼 수 있어요.',
          },
          PRIVATE: {
            TITLE: '비공개',
            DESCRIPTION: '링크가 있어도 방명록은 나만 볼 수 있어요.',
          },
        },
      },
    },
    DESCRIPTION: {
      TITLE: '스페이스의 설명을 작성해주세요',
      DESCRIPTION: '내 스페이스에 대한 정보를 알려주세요. (선택)',
    },
    DETAIL: {
      TITLE: '스페이스의 세부 정보를 입력해주세요',
      DESCRIPTION: '프로필 사진과 연락처 정보를 입력할 수 있어요. (선택)',
    },
    CHECK: {
      TITLE: '스페이스 정보를 확인해주세요',
      DESCRIPTION: '생성하기를 누르면 링크가 발급돼요.',
    },
  },
} as const;
