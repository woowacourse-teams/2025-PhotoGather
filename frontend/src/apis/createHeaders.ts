import type { BodyContentType } from '../types/api.type';

export const createHeaders = (
  bodyContentType: BodyContentType,
  token?: string,
): HeadersInit => {
  const headers: HeadersInit = {};

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
