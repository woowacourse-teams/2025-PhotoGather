export const ROUTES = {
  MAIN: '/',
  HOST: {
    MY_PAGE: '/host/my-page',
    CREATE_SPACE: '/host/create-space',
    SHARE: '/host/share',
  },
  GUEST: {
    MAIN: '/guest/main',
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
