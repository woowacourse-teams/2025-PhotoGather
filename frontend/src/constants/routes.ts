export const ROUTES = {
  MAIN: '/',
  LOGIN: '/login',
  CREATE: '/create',
  MANAGER: {
    SPACE_HOME: (spaceCode: string) => `/manager/space-home/${spaceCode}`,
    DASHBOARD: (spaceCode: string) =>
      `/manager/space-home/${spaceCode}/dashboard`,
    SETTING: (spaceCode: string) => `/manager/space-home/${spaceCode}/settings`,
  },
  GUEST: {
    IMAGE_UPLOAD: (spaceCode: string) => `/guest/image-upload/${spaceCode}`,
    SHARE: '/guest/share',
  },
  COMPLETE: {
    UPLOAD: '/complete/upload',
    DOWNLOAD: '/complete/download',
    SPACE_CREATED: '/complete/space-created',
  },
  MYPAGE: '/mypage',
  ERROR: {
    NETWORK: '/network-error',
    NOT_FOUND: '*',
  },
  DEMO: '/demo',
  PRIVACY_POLICY: '/privacy-policy',
} as const;
