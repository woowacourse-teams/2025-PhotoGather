import { CONSTRAINTS } from './constraints';

export const INFORMATION = {
  NO_IMAGE: '곧 스페이스가 채워질 예정이에요',
  LINK_WARNING: {
    DESCRIPTION: `이 화면을 지나면 링크를 볼 수 없어요.\n지금 꼭 복사하거나 저장해 주세요!`,
    HIGHLIGHT_TEXT: '지금 꼭 복사하거나 저장해 주세요!',
  },
  COMPLETE_CREATE: {
    DESCRIPTION: '스페이스 생성이 완료됐어요.',
    HIGHLIGHT_TEXT: '완료',
  },
  SUGGEST_SHARE: {
    DESCRIPTION: '스페이스 링크를 공유해 보세요',
    HIGHLIGHT_TEXT: '스페이스 링크',
  },
  SHARE_LINK_API: {
    TITLE: '스페이스 업로드 링크 공유',
    CREATE_TEXT: (spaceName: string) =>
      `${spaceName}에 사진을 업로드 할 수 있는 링크를 공유했어요!`,
  },
  SHARE_WARNING: {
    DESCRIPTION: `내 스페이스 관리 페이지에서도\n스페이스 링크를 확인할 수 있어요`,
    HIGHLIGHT_TEXT: '스페이스 링크',
  },
  AGREEMENT: {
    TITLE: {
      TEXT: '서비스 사용을 위해\n약관에 동의해주세요',
      HIGHLIGHT_TEXT: '약관에 동의',
    },
    DESCRIPTION: '첫 스페이스 생성시에만 동의가 필요해요',
  },
  NAME_INPUT: {
    TITLE: {
      TEXT: '스페이스 이름을 정해볼까요?',
      HIGHLIGHT_TEXT: '이름',
    },
    DESCRIPTION: '추억을 담을 공간의 이름을 작성해주세요.',
    PLACEHOLDER: '나만의 스페이스',
  },
  DATE_INPUT: {
    TITLE: {
      TEXT: '스페이스를 언제부터 열까요?',
      HIGHLIGHT_TEXT: '언제부터',
    },
    DESCRIPTION: '선택한 시점부터 72시간 동안 열려요.',
  },
  TIME_INPUT: {
    TITLE: {
      TEXT: '스페이스를 몇시부터 열까요?',
      HIGHLIGHT_TEXT: '몇시부터',
    },
    DESCRIPTION: '선택한 시점부터 24시간 동안 열려요.',
  },
  CHECK_SPACE_INFO: {
    TITLE: {
      TEXT: '스페이스 정보를 확인해 주세요.',
      HIGHLIGHT_TEXT: '스페이스 정보',
    },
    DESCRIPTION: '완료를 누르면 곧바로 링크가 발급돼요.',
  },
  WAIT_PAGE: {
    TITLE_LIST: ['조금만 기다려주세요', '곧 스페이스 생성이 끝나요'],
  },
  SETTINGS: {
    DESCRIPTION: `사진이 업로드된 이후에는\n시작 날짜 / 시간을 수정할 수 없어요.`,
    HIGHLIGHT_TEXT: '시작 날짜 / 시간',
  },
  LOGIN: {
    TITLE: {
      TEXT: '로그인 후 서비스를 이용해주세요',
      HIGHLIGHT_TEXT: '로그인',
    },
    DESCRIPTION: '당신의 사진을 모아 드릴게요',
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
};

export const ERROR = {
  NETWORK: {
    TITLE: '스페이스를 불러오지 못했어요',
    DESCRIPTION: '잠시후 재시도 해주세요.',
    BUTTON_TEXT: '재시도',
    HIGHLIGHT_WORDS: [''],
  },
  INPUT: {
    NAME: `${CONSTRAINTS.NAME_MAX_LENGTH}자 까지 입력할 수 있어요.`,
    DATE: '오늘 이전 날짜는 선택할 수 없어요.',
    TIME: '현재 시간 이후 시간대를 입력해주세요.',
  },
  NOT_FOUND: {
    TITLE: '페이지를 찾을 수 없습니다',
    DESCRIPTION: '잘못된 경로이거나 페이지가 삭제되었어요.',
    BUTTON_TEXT: '홈으로 이동',
    HIGHLIGHT_WORDS: [''],
  },
  DOWNLOAD: {
    NO_SELECTED_PHOTO: '선택된 사진이 없습니다.',
  },
  DELETE: {
    NO_SELECTED_PHOTO: '선택된 사진이 없습니다.',
  },
};

export const createPhotoSelectedMessage = (count: number) =>
  `${count}개의 사진이 선택됨`;
