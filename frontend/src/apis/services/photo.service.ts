import type { PhotoListResponse } from '../../types/api.type';
import type {
  CreatePhotoInput,
  Photo,
  PhotoWithContent,
} from '../../types/photo.type';
import { http } from '../http';

export const photoService = {
  getAll: (params?: { page?: number; pageSize?: number }) =>
    http.get<PhotoListResponse>('/photos', params),

  getById: (photoId: number) => http.get<Photo>(`/photos/${photoId}`),

  getBySpaceCode: (
    spaceCode: string,
    params?: { page?: number; size?: number },
  ) => http.get<PhotoListResponse>(`/spaces/${spaceCode}/photos`, params),

  create: (data: CreatePhotoInput) => http.post<Photo>('/photos', data),

  uploadFiles: (spaceCode: string, files: File[]) => {
    const formData = new FormData();
    files.forEach((file) => formData.append('files', file));
    return http.post(
      `/spaces/${spaceCode}/photos/upload`,
      formData,
      'form-data',
    );
  },

  downloadZip: (spaceCode: string) =>
    http.get<Blob>(`/spaces/${spaceCode}/photos/download`, undefined, 'blob'),

  deletePhotos: (spaceCode: string, photoIds: number[]) =>
    http.delete<void>(`/spaces/${spaceCode}/photos/selected`, photoIds, 'json'),

  getWithContent: (photoId: number) =>
    http.get<PhotoWithContent>(`/photos/${photoId}/content`),
};
