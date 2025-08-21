export const ROUTES = {
  MAIN: '/',
  LOGIN: '/login',
  AUTH: {
    KAKAO: '/auth/login/kakao',
  },
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
  LOGOUT: '/logout',
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
