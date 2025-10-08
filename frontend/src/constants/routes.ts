export const ROUTES = {
  HOST: {
    MAIN: '/host/main',
    MY_PAGE: '/host/my-page',
    WORK_DETAIL: '/host/work-detail',
    WORK_FORM: '/host/work-form',
  },
  GUEST: {
    MAIN: '/guest/main',
    WORK_DETAIL: '/guest/work-detail',
  },
};

export const createSpaceInfoRoute = (spaceCode: string) => {
  return `/host/${spaceCode}/space-info`;
};

export const createSpaceInfoEditRoute = (spaceCode: string) => {
  return `/host/${spaceCode}/space-info/edit`;
};
