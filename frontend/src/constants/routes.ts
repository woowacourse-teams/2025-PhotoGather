export const ROUTES = {
  LANDING: '/',
  IN_APP_BROWSER: '/inapp',
  AUTH: {
    LOGIN: '/login',
    KAKAO: '/auth/login/kakao',
  },
  HOST: {
    MAIN: '/host/main',
    MY_PAGE: '/host/my-page',
    CREATE_SPACE: '/host/create-space',
    SHARE: '/host/share',
    WORK_LIST: '/host/work-list',
  },
  GUEST: {
    CREATE_GUESTBOOK_COMPLETE: '/guest/create-guestbook-complete',
  },
};

export const createSpaceMainRoute = (spaceCode: string) => {
  return `/host/${spaceCode}/home`;
};

export const createSpaceInfoRoute = (spaceCode: string) => {
  return `/host/${spaceCode}/space-info`;
};

export const createSpaceInfoEditRoute = (spaceCode: string) => {
  return `/host/${spaceCode}/space-info/edit`;
};

export const createWorkDetailRoute = (spaceCode: string, workId: string) => {
  return `/host/${spaceCode}/work-detail/${workId}`;
};

export const createWorkEditRoute = (spaceCode: string, workId: string) => {
  return `/host/${spaceCode}/work-detail/${workId}/edit`;
};

export const createWorkListRoute = (spaceCode: string) => {
  return `/host/${spaceCode}/work-list`;
};

export const createGuestWorkListRoute = (spaceCode: string) => {
  return `/guest/${spaceCode}/work-list`;
};

export const createGuestWorkDetailRoute = (
  spaceCode: string,
  workId: string,
) => {
  return `/guest/${spaceCode}/work-detail/${workId}`;
};

export const createGuestbookRoute = (spaceCode: string) => {
  return `/host/${spaceCode}/guestbook`;
};

export const createGuestGuestbookRoute = (spaceCode: string) => {
  return `/guest/${spaceCode}/guestbook`;
};

export const createGuestbookCompleteRoute = (spaceCode: string) => {
  return `/guest/${spaceCode}/create-guestbook-complete`;
};

export const createGuestHomeRoute = (spaceCode: string) => {
  return `/guest/${spaceCode}/home`;
};

export const createCreateGuestbookRoute = (spaceCode: string) => {
  return `/guest/${spaceCode}/create-guestbook`;
};

export const createGuestbookCardRoute = (
  spaceCode: string,
  guestbookCardId: number | string,
) => {
  return `/host/${spaceCode}/guestbook/${guestbookCardId}`;
};

export const createGuestGuestbookCardRoute = (
  spaceCode: string,
  guestbookCardId: number | string,
) => {
  return `/guest/${spaceCode}/guestbook/${guestbookCardId}`;
};

export const createGetKakaoCodeUrl = (clientId: string, redirectUri: string) =>
  `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}`;

export const createGetKakaoTokenRequestUrl = (
  clientId: string,
  redirectUri: string,
  code: string,
) =>
  `https://kauth.kakao.com/oauth/token?grant_type=authorization_code&client_id=${clientId}&redirect_uri=${redirectUri}&code=${code}`;
