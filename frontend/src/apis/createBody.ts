import type { BodyType } from '../types/api.type';

export const createBody = (
  body: unknown,
  bodyType: BodyType,
): BodyInit | undefined => {
  switch (bodyType) {
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
