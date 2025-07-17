export const INFO = {
  LINK_WARNING: {
    DESCRIPTION: `이 화면을 지나면 링크를 볼 수 없어요.\n지금 꼭 복사하거나 저장해 주세요!`,
    HIGHLIGHT_TEXT: '지금 꼭 복사하거나 저장해 주세요!',
  },
} as const;

export const createSpaceHomeInfoMessage = (
  participantsCount: number,
  photosCount: number,
) =>
  `지금까지 ${participantsCount}명의 게스트가\n ${photosCount}장의 사진을 올렸어요!`;
