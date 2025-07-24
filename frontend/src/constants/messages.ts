export const INFORMATION = {
  LINK_WARNING: {
    DESCRIPTION: `이 화면을 지나면 링크를 볼 수 없어요.\n지금 꼭 복사하거나 저장해 주세요!`,
    HIGHLIGHT_TEXT: '지금 꼭 복사하거나 저장해 주세요!',
  },
  SUGGEST_SHARE: {
    DESCRIPTION: '스페이스 링크를 공유해 보세요',
    HIGHLIGHT_TEXT: '스페이스 링크',
  },
  SHARE_WARNING: {
    DESCRIPTION: `내 스페이스 관리 페이지에서도\n스페이스 링크를 확인할 수 있어요`,
    HIGHLIGHT_TEXT: '스페이스 링크',
  },
} as const;

export const createSpaceHomeInfoMessage = (
  participantsCount: number,
  photosCount: number,
) =>
  `지금까지 ${participantsCount}명의 게스트가\n ${photosCount}장의 사진을 올렸어요!`;

export const COMPLETE = {
  UPLOAD: {
    TITLE: '추억을 전달했어요',
    DESCRIPTION: '업로드가 완료됐어요',
    BUTTON_TEXT: '이어서 업로드하기',
    HIGHLIGHT_WORDS: ['추억'],
  },
  DOWNLOAD: {
    TITLE: '추억을 저장했어요',
    DESCRIPTION: '다운로드를 완료했어요',
    BUTTON_TEXT: '나의 스페이스로 이동',
    HIGHLIGHT_WORDS: ['추억'],
  },
  SPACE_CREATED: {
    TITLE: '스페이스가 완성됐어요',
    DESCRIPTION: '내 스페이스로 이동해 볼까요?',
    BUTTON_TEXT: '나의 스페이스로 이동',
    HIGHLIGHT_WORDS: ['스페이스'],
  },
} as const;
