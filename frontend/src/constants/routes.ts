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
  MYPAGE: '/mypage',
  ERROR: {
    NETWORK: '/network-error',
    NOT_FOUND: '*',
  },
  DEMO: '/demo',
  POLICY: {
    PRIVACY_POLICY: '/policy/privacy-policy',
    TERMS_OF_SERVICE: '/policy/terms-of-service',
    PRIVACY_CONSENT: '/policy/privacy-consent',
  },
} as const;
