export const ROUTES = {
  MAIN: '/',
  LANDING: '/landing',
  LOGIN: '/login',
  AUTH: {
    KAKAO: '/auth/login/kakao',
  },
  CREATE: '/create',
  MANAGER: {
    SPACE_HOME: (spaceCode: string) => `/space/${spaceCode}`,
    DASHBOARD: (spaceCode: string) => `/space/${spaceCode}/dashboard`,
    SETTING: (spaceCode: string) => `/space/${spaceCode}/settings`,
  },
  GUEST: {
    IMAGE_UPLOAD: (spaceCode: string) => `/guest/image-upload/${spaceCode}`,
    SHARE: '/share',
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
  OPEN_BROWSER: '/open-browser',
  DEMO: '/demo',
  POLICY: {
    PRIVACY_POLICY: '/policy/privacy-policy',
    TERMS_OF_SERVICE: '/policy/terms-of-service',
    PRIVACY_CONSENT: '/policy/privacy-consent',
  },
} as const;
