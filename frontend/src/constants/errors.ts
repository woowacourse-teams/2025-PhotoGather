export const NETWORK_ERROR = {
  DEFAULT: 'Network error',
  CHROMIUM: 'Failed to fetch',
  FIREFOX: 'NetworkError',
  CHROME: 'ERR_INTERNET_DISCONNECTED',
  REACT_NATIVE: 'Network request failed',
};

export const HTTP_STATUS_MESSAGES: Record<number, string> = {
  400: '요청 형식이 올바르지 않습니다.',
  401: '인증이 필요합니다.',
  403: '접근 권한이 없습니다.',
  404: '존재하지 않는 리소스입니다.',
  500: '서버 오류가 발생했습니다.',
  502: '서버 통신에 문제가 발생했습니다.',
  503: '서버가 일시적으로 장애가 발생했습니다.',
};
