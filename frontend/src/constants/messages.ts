export const INFORMATION = {
  NO_IMAGE: '곧 스페이스가 채워질 예정이에요',
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
