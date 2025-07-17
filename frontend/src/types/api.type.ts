import type { Photo } from './photo.type';

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PhotoListResponse {
  photos: Photo[];
  currentPage: number;
  pageSize: number;
  totalPages: number;
}
