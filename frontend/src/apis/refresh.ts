import { CONSTRAINTS } from '../constants/constraints';
import { HttpError } from '../types/error.type';
import { refreshAccessToken, setAuthTokens } from '../utils/authCookieManager';

export const retryAuth = async (fetchFunction: () => Promise<Response>) => {
  let retryCount = 0;
  const maxRetryCount = CONSTRAINTS.MAX_COUNT_FOR_REFRESH;

  while (retryCount < maxRetryCount) {
    try {
      console.log('작동');
      const newTokens = await refreshAccessToken();
      console.log(newTokens);

      setAuthTokens(newTokens.accessToken, newTokens.refreshToken);

      const retriedResponse = await fetchFunction();

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
