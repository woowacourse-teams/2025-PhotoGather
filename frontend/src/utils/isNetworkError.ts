import { NETWORK_ERROR } from '../constants/errors';

export const isNetworkError = (error: unknown): boolean => {
  return (
    (error instanceof TypeError && error.message === NETWORK_ERROR.CHROMIUM) ||
    (error instanceof Error &&
      (error.message.includes(NETWORK_ERROR.CHROMIUM) ||
        error.message.includes(NETWORK_ERROR.FIREFOX) ||
        error.message.includes(NETWORK_ERROR.CHROME) ||
        error.message.includes(NETWORK_ERROR.REACT_NATIVE)))
  );
};
