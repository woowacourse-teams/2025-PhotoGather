import type { BodyContentType } from '../types/api.type';

export const createBody = (
  body: unknown,
  bodyContentType: BodyContentType,
): BodyInit | undefined => {
  switch (bodyContentType) {
    case 'json':
      return body ? JSON.stringify(body) : undefined;
    case 'form-data':
      return body as FormData;
    case 'blob':
      return body as Blob;
    default:
      return undefined;
  }
};
