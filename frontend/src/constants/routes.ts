export const ROUTES = {
  MAIN: '/',
  LOGIN: '/login',
  CREATE: '/create',
  MANAGER: {
    SPACE_HOME: (spaceId: string) => `/manager/space-home/${spaceId}`,
  },
  GUEST: {
    IMAGE_UPLOAD: (spaceId: string) => `/guest/image-upload/${spaceId}`,
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
  DEMO: '/demo',
} as const;

export const STAR_FIELD_PAGES: readonly string[] = [
  ROUTES.MANAGER.SPACE_HOME(''),
  ROUTES.GUEST.IMAGE_UPLOAD(''),
];

export const HIGHLIGHT_PAGES: readonly string[] = [
  ROUTES.MANAGER.SPACE_HOME(''),
  ROUTES.GUEST.IMAGE_UPLOAD(''),
  ROUTES.MAIN,
];
