import { NETWORK_ERROR } from '../src/constants/errors';
import { isNetworkError } from '../src/utils/isNetworkError';

describe('isNetworkError 유틸 함수 테스트', () => {
  it('Chrome의 TypeError Failed to fetch를 감지해야 함', () => {
    const error = new TypeError(NETWORK_ERROR.CHROMIUM);
    expect(isNetworkError(error)).toBe(true);
  });

  it('에러 메시지에 네트워크 에러 문자열이 포함된 경우 감지해야 함', () => {
    const error = new Error(`Something went wrong: ${NETWORK_ERROR.CHROMIUM}`);
    expect(isNetworkError(error)).toBe(true);
  });

  it('일반적인 에러는 네트워크 에러로 감지하지 않아야 함', () => {
    const error = new Error('Invalid request');
    expect(isNetworkError(error)).toBe(false);
  });

  it('네트워크 에러가 아닌 TypeError는 false를 반환해야 함', () => {
    const error = new TypeError('Cannot read property of undefined');
    expect(isNetworkError(error)).toBe(false);
  });

  it('null이나 undefined는 false를 반환해야 함', () => {
    expect(isNetworkError(null)).toBe(false);
    expect(isNetworkError(undefined)).toBe(false);
  });
});
