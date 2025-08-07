export const ROUTES = {
  MAIN: '/',
  CREATE: '/create',
  MANAGER: {
    SPACE_HOME: '/manager/space-home',
  },
  GUEST: {
    IMAGE_UPLOAD: '/guest/image-upload',
    SHARE: '/guest/share',
  },
  COMPLETE: {
    UPLOAD: '/complete/upload',
    DOWNLOAD: '/complete/download',
    SPACE_CREATED: '/complete/space-created',
  },
  ERROR: {
    NETWORK: '/network-error',
  },
  LANDING: '/landing',
} as const;

export const STAR_FIELD_PAGES: readonly string[] = [
  ROUTES.MANAGER.SPACE_HOME,
  ROUTES.GUEST.IMAGE_UPLOAD,
];

export const HIGHLIGHT_PAGES: readonly string[] = [
  ROUTES.MANAGER.SPACE_HOME,
  ROUTES.GUEST.IMAGE_UPLOAD,
  ROUTES.LANDING,
];
