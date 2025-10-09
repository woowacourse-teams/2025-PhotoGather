export const ROUTES = {
  HOST: {
    MY_PAGE: '/host/my-page',
    WORK_DETAIL: '/host/work-detail',
    WORK_FORM: '/host/work-form',
    CREATE_SPACE: '/host/create-space',
    SHARE: '/host/share',
  },
  GUEST: {
    MAIN: '/guest/main',
    WORK_DETAIL: '/guest/work-detail',
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
