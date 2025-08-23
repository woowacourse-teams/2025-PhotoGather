import type { Photo } from './photo.type';

export type BodyContentType = 'json' | 'form-data' | 'blob' | 'none';

export interface requestOptionsType {
  method: string;
  body?: unknown;
  params?: Record<string, unknown>;
  bodyContentType?: BodyContentType;
  withTraceId: boolean;
  token?: string;
  fullUrl?: string;
  headersOverride?: Record<string, string>;
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

export interface PresignedUrlsResponse {
  signedUrls: Record<string, string>;
}

export interface UploadedPhotos {
  uploadFileName: string;
  originalName: string;
  capturedAt: string | null;
}

export interface MyInfo {
  id: number;
  name: string;
  pictureUrl: string;
  agreedTerms: boolean;
}
