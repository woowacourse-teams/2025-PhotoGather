import { AUTH_COOKIES } from '../constants/cookie';
import { CookieUtils } from '../utils/cookie';

export const matchBody = (body: unknown) => {
  if (!body) {
    return undefined;
  }
  if (body instanceof FormData) {
    return body;
  }
  return JSON.stringify(body);
};

export const matchHeaders = (
  body: unknown,
  headers: Record<string, string>,
  token?: string,
) => {
  const mergedHeaders = { ...headers };
  if (body instanceof FormData) {
    delete mergedHeaders['Content-Type'];
    delete mergedHeaders['content-type'];
  } else {
    mergedHeaders['Content-Type'] =
      mergedHeaders['Content-Type'] ?? 'application/json';
  }

  const authToken = token ?? CookieUtils.get(AUTH_COOKIES.ACCESS);
  if (authToken) {
    mergedHeaders['Authorization'] = `Bearer ${authToken}`;
  }

  return mergedHeaders;
};
