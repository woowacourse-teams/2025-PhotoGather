export const ROUTES = {
  MAIN: '/',
  MANAGER: {
    SPACE_HOME: '/manager/space-home',
  },
  GUEST: {
    IMAGE_UPLOAD: '/guest/image-upload',
    SHARE: '/guest/share',
  },
} as const;

export const HIGHLIGHT_PAGES: readonly string[] = [
  ROUTES.MANAGER.SPACE_HOME,
  ROUTES.GUEST.IMAGE_UPLOAD,
];
