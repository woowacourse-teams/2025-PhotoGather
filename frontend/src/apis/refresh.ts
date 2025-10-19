import { CONSTRAINTS } from '../constants/constraints';
import { HttpError } from '../types/error.type';
import { refreshAccessToken } from '../utils/authCookieManager';

export const retryAuth = async (
  fetchFunction: (newAccessToken: string) => Promise<Response>,
) => {
  let retryCount = 0;
  const maxRetryCount = CONSTRAINTS.MAX_COUNT_FOR_REFRESH;

  while (retryCount < maxRetryCount) {
    try {
      const newTokens = await refreshAccessToken();

      const retriedResponse = await fetchFunction(newTokens.accessToken);

      if (retriedResponse.ok) return retriedResponse;

      retryCount += 1;
    } catch (error) {
      if (error instanceof Error) {
        throw new HttpError(401, error.message);
      }
      throw new HttpError(401, '토큰 갱신 실패');
    }
  }

  throw new HttpError(401, '토큰 갱신 최대 횟수를 초과했습니다.');
};
