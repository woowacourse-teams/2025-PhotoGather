import type { BodyContentType } from '../types/api.type';

export const createHeaders = (
  bodyContentType: BodyContentType,
  token?: string,
  withTraceId: boolean = true,
): HeadersInit => {
  const traceId = crypto.randomUUID().slice(0, 8);

  const headers: HeadersInit = withTraceId
    ? {
        'trace-id': traceId,
      }
    : {};

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  switch (bodyContentType) {
    case 'json':
      headers['Content-Type'] = 'application/json';
      break;
    case 'blob':
      headers['Content-Type'] = 'application/zip';
      break;
    default:
      break;
  }

  return headers;
};
