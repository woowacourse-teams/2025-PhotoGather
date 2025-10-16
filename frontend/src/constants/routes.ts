export const ROUTES = {
  MAIN: '/',
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

export const createCreateGuestbookRoute = (spaceCode: string) => {
  return `/guest/${spaceCode}/create-guestbook`;
};

export const createGuestbookCardRoute = (
  spaceCode: string,
  guestbookCardId: number | string,
) => {
  return `/host/${spaceCode}/guestbook/${guestbookCardId}`;
};
