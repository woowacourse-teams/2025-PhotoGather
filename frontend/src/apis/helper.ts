import { AUTH_COOKIES } from '../constants/cookie';
import type { Method } from '../types/api.type';
import { CookieUtils } from '../utils/cookie';

interface MatchHeadersProps {
  body: unknown;
  headers: Record<string, string>;
  method: Method;
  token?: string;
}

const generateTraceId = () => {
  return crypto.randomUUID().slice(0, 8);
};

export const matchBody = (body: unknown) => {
  if (!body) {
    return undefined;
  }
  if (body instanceof FormData) {
    return body;
  }
  return JSON.stringify(body);
};

export const matchHeaders = ({
  body,
  headers,
  method,
  token = undefined,
}: MatchHeadersProps) => {
  const mergedHeaders = { ...headers };
  if (body instanceof FormData || method === 'GET') {
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

  mergedHeaders['trace-id'] = generateTraceId();

  return mergedHeaders;
};
