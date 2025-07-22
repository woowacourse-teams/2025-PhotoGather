import type { PhotoListResponse } from '../../types/api.type';
import type {
  CreatePhotoInput,
  Photo,
  PhotoWithContent,
} from '../../types/photo.type';
import { http, uploadFile } from '../http';

export const photoService = {
  getAll: (params?: { page?: number; pageSize?: number }) =>
    http.get<PhotoListResponse>('/photos', params),

  getById: (id: number) => http.get<Photo>(`/photos/${id}`),

  getBySpaceId: (spaceId: number, params?: { page?: number; size?: number }) =>
    http.get<PhotoListResponse>(`/spaces/${spaceId}/photos`, params),

  create: (data: CreatePhotoInput) => http.post<Photo>('/photos', data),

  upload: (file: File, spaceContentId: number) =>
    uploadFile<Photo>('/photos/upload', file, { spaceContentId }),

  delete: (id: number) => http.delete<void>(`/photos/${id}`),

  getWithContent: (id: number) =>
    http.get<PhotoWithContent>(`/photos/${id}/content`),
};
