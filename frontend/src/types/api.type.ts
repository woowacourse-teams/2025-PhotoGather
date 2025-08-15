import type { Photo } from './photo.type';

export type BodyContentType = 'json' | 'form-data' | 'blob' | 'none';

export interface requestOptionsType {
  method: string;
  body?: unknown;
  params?: Record<string, unknown>;
  bodyContentType?: BodyContentType;
  token?: string;
}
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
  sentryContext?: {
    request: {
      url: string;
      method: string;
      headers: Record<string, unknown>;
      requestBody: Record<string, unknown> | undefined;
    };
    response: {
      status: number;
      data: unknown;
    };
  };
}

export interface PhotoListResponse {
  photos: Photo[];
  currentPage: number;
  pageSize: number;
  totalPages: number;
}

export interface PhotoIds {
  photoIds: number[];
}

export interface PhotoId {
  photoId: number;
}
