export const ROUTES = {
  MAIN: '/',
  LOGIN: '/login',
  CREATE: '/create',
  MANAGER: {
    SPACE_HOME: (spaceId: string) => `/manager/space-home/${spaceId}`,
    DASHBOARD: (spaceId: string) => `/manager/space-home/${spaceId}/dashboard`,
    SETTING: (spaceId: string) => `/manager/space-home/${spaceId}/settings`,
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
  MYPAGE: '/mypage',
  ERROR: {
    NETWORK: '/network-error',
    NOT_FOUND: '*',
  },
  DEMO: '/demo',
  PRIVACY_POLICY: '/privacy-policy',
} as const;
