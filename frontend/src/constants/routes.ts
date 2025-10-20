export const ROUTES = {
  MAIN: '/',
  AUTH: {
    LOGIN: '/login',
    KAKAO: '/auth/login/kakao',
  },
  HOST: {
    MY_PAGE: '/host/my-page',
    CREATE_SPACE: '/host/create-space',
    SHARE: '/host/share',
  },
  GUEST: {
    MAIN: '/guest/main',
    CREATE_GUESTBOOK_COMPLETE: '/guest/create-guestbook-complete',
  },
};

export const createSpaceMainRoute = (spaceCode: string) => {
  return `/host/${spaceCode}/main`;
};

export const createSpaceInfoRoute = (spaceCode: string) => {
  return `/host/${spaceCode}/space-info`;
};

export const createSpaceInfoEditRoute = (spaceCode: string) => {
  return `/host/${spaceCode}/space-info/edit`;
};

export const createWorkDetailRoute = (spaceCode: string) => {
  return `/host/${spaceCode}/work-detail`;
};

export const createWorkEditRoute = (spaceCode: string) => {
  return `/host/${spaceCode}/work-detail/edit`;
};

export const createGuestWorkDetailRoute = (spaceCode: string) => {
  return `/guest/${spaceCode}/work-detail`;
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

export const createGuestMainRoute = (spaceCode: string) => {
  return `/guest/${spaceCode}/main`;
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
