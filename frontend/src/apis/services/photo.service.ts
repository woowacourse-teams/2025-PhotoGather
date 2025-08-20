import type { PhotoIds, PhotoListResponse } from '../../types/api.type';
import type {
  CreatePhotoInput,
  Photo,
  PhotoWithContent,
} from '../../types/photo.type';
import { http } from '../http';

export const photoService = {
  getAll: (params?: { page?: number; pageSize?: number }) =>
    http.get<PhotoListResponse>('/photos', params),

  getById: (spaceCode: string, photoId: number) =>
    http.get<Photo>(`/spaces/${spaceCode}/photos/${photoId}`),

  getBySpaceCode: (
    spaceCode: string,
    params?: { page?: number; size?: number },
  ) => http.get<PhotoListResponse>(`/spaces/${spaceCode}/photos`, params),

  create: (data: CreatePhotoInput) => http.post<Photo>('/photos', data),

  uploadFiles: (spaceCode: string, files: File[], guestId: number) => {
    const formData = new FormData();
    files.forEach((file) => formData.append('files', file));
    return http.post(
      `/spaces/${spaceCode}/photos/upload?guestId=${guestId}`,
      formData,
      'form-data',
    );
  },

  downloadAll: (spaceCode: string) =>
    http.post<Blob>(`/spaces/${spaceCode}/photos/download`, undefined),

  downloadPhotos: (spaceCode: string, photoIds: PhotoIds) =>
    http.post<Blob>(`/spaces/${spaceCode}/photos/download/selected`, photoIds),

  downloadSinglePhoto: (spaceCode: string, photoId: number) =>
    http.post<Blob>(`/spaces/${spaceCode}/photos/download/${photoId}`, photoId),

  deletePhotos: (spaceCode: string, photoIds: PhotoIds) =>
    http.delete<void>(`/spaces/${spaceCode}/photos/selected`, photoIds, 'json'),

  deletePhoto: (spaceCode: string, photoId: number) =>
    http.delete<void>(`/spaces/${spaceCode}/photos/${photoId}`),

  getWithContent: (photoId: number) =>
    http.get<PhotoWithContent>(`/photos/${photoId}/content`),
};
