import { NETWORK } from '../constants/errors';

export const isNetworkError = (error: unknown): boolean => {
  return (
    (error instanceof TypeError && error.message === NETWORK.CHROMIUM) ||
    (error instanceof Error &&
      (error.message.includes(NETWORK.CHROMIUM) ||
        error.message.includes(NETWORK.FIREFOX) ||
        error.message.includes(NETWORK.CHROME) ||
        error.message.includes(NETWORK.REACT_NATIVE)))
  );
};
