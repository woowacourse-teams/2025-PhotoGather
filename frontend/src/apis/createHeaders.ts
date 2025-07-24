import type { BodyType } from '../types/api.type';

export const createHeaders = (
  bodyType: BodyType,
  token?: string,
): HeadersInit => {

  const headers: HeadersInit = {};

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  switch (bodyType) {
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
