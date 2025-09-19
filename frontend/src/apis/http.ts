import * as Sentry from '@sentry/react';
import { HTTP_STATUS_MESSAGES } from '../constants/errors';
import { AUTH_COOKIES } from '../constants/keys';
import type {
  ApiResponse,
  BodyContentType,
  requestOptionsType,
} from '../types/api.type';
import { HttpError } from '../types/error.type';
import { refreshAccessToken, setAuthTokens } from '../utils/authCookieManager';
import { CookieUtils } from '../utils/CookieUtils';
import { makeSentryRequestContext } from '../utils/sentry/sentryRequestContext';
import { BASE_URL } from './config';
import { createBody } from './createBody';
import { createHeaders } from './createHeaders';

const buildQueryString = (params?: Record<string, unknown>): string => {
  if (!params) return '';

  const searchParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      searchParams.append(key, String(value));
    }
  });

  return searchParams.toString() ? `?${searchParams.toString()}` : '';
};

const request = async <T>(
  endpoint: string,
  {
    method,
    body,
    params,
    bodyContentType = 'json',
    withTraceId,
    token,
    fullUrl,
    headersOverride,
  }: requestOptionsType,
): Promise<ApiResponse<T>> => {
  const url = fullUrl ?? `${BASE_URL}${endpoint}${buildQueryString(params)}`;
  const baseHeaders = createHeaders(
    bodyContentType,
    token,
    withTraceId,
    method,
  );
  const headers = { ...baseHeaders, ...headersOverride };

  const requestBody = createBody(body, bodyContentType);

  const doFetch = async (overrideToken?: string) => {
    return await fetch(url, {
      method,
      headers: {
        ...headers,
        ...(overrideToken ? { Authorization: `Bearer ${overrideToken}` } : {}),
      },
      body: requestBody,
    });
  };

  try {
    let response = await doFetch();

    if (response.status === 401) {
      try {
        const newTokens = await refreshAccessToken();
        setAuthTokens(newTokens.accessToken, newTokens.refreshToken);
        response = await doFetch(newTokens.accessToken);
      } catch (error) {
        if (error instanceof Error) throw new HttpError(401, error.message);
      }
    }

    const contentType = response.headers.get('content-type');
    if (
      contentType?.includes('application/zip') ||
      contentType?.includes('image/')
    ) {
      const blob = await response.blob();
      return {
        success: response.ok,
        data: blob as unknown as T,
        error: !response.ok ? `Error: ${response.status}` : undefined,
      };
    }

    const text = await response.text();
    const data = text ? JSON.parse(text) : null;

    if (!response.ok) {
      const errorMessage = `[ErrorCode ${response.status}] ${
        data?.message ? data.message : HTTP_STATUS_MESSAGES[response.status]
      }`;
      const error = new Error(errorMessage);

      const sentryContext = makeSentryRequestContext(
        url,
        method,
        headers,
        requestBody,
      );
      Sentry.captureException(error, (scope) => {
        scope.setContext('http', {
          ...sentryContext,
        });

        return scope;
      });

      throw new HttpError(response.status, errorMessage);
    }

    return {
      success: true,
      data: data as T,
    };
  } catch (error) {
    if (error instanceof HttpError) {
      throw error;
    }
    if (error instanceof Error) {
      throw new Error(`네트워크 에러가 발생했습니다. 다시 시도해 주세요.`);
    }
    throw error;
  }
};

interface createHttpClientProps {
  withTraceId?: boolean;
  getToken?: () => string | undefined;
}
const createHttpClient = ({
  withTraceId,
  getToken,
}: createHttpClientProps) => ({
  get: <T>(
    endpoint: string,
    params?: Record<string, unknown>,
    bodyContentType?: BodyContentType,
  ) =>
    request<T>(endpoint, {
      method: 'GET',
      params,
      bodyContentType,
      withTraceId: withTraceId ?? true,
      token: getToken?.(),
    }),

  post: <T>(
    endpoint: string,
    body?: unknown,
    bodyContentType: BodyContentType = 'json',
  ) =>
    request<T>(endpoint, {
      method: 'POST',
      body,
      bodyContentType,
      withTraceId: withTraceId ?? true,
      token: getToken?.(),
    }),

  put: <T>(
    endpoint: string,
    body?: unknown,
    bodyContentType: BodyContentType = 'json',
  ) =>
    request<T>(endpoint, {
      method: 'PUT',
      body,
      bodyContentType,
      withTraceId: withTraceId ?? true,
      token: getToken?.(),
    }),

  patch: <T>(
    endpoint: string,
    body?: unknown,
    bodyContentType: BodyContentType = 'json',
  ) =>
    request<T>(endpoint, {
      method: 'PATCH',
      body,
      bodyContentType,
      withTraceId: withTraceId ?? true,
      token: getToken?.(),
    }),

  delete: <T>(
    endpoint: string,
    body?: unknown,
    bodyContentType: BodyContentType = 'json',
  ) =>
    request<T>(endpoint, {
      method: 'DELETE',
      body,
      bodyContentType,
      withTraceId: withTraceId ?? true,
      token: getToken?.(),
    }),
  putToS3: <T>(url: string, file: File) =>
    request<T>('', {
      method: 'PUT',
      body: file,
      bodyContentType: 'blob',
      withTraceId: false,
      fullUrl: url,
      headersOverride: {
        'Content-Type': file.type || 'application/octet-stream',
        'Cache-Control': 'no-store',
        'Content-Disposition': `attachment; filename*=UTF-8''${encodeURIComponent(file.name)}`,
        'x-amz-tagging':
          'Service=techcourse&Role=techcourse-etc&ProjectTeam=PhotoGather',
      },
    }),
});

export const http = createHttpClient({});
export const authHttp = createHttpClient({
  getToken: () => CookieUtils.get(AUTH_COOKIES.ACCESS) ?? '',
});
