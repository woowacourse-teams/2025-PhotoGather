import type { PhotoIds, PhotoListResponse } from '../../types/api.type';
import type {
  AllDownloadInfos,
  CreatePhotoInput,
  Photo,
  SelectedDownloadInfos,
  SingleDownloadInfos,
} from '../../types/photo.type';
import { authHttp, http } from '../http';

export const photoService = {
  getAll: (params?: { page?: number; pageSize?: number }) =>
    authHttp.get<PhotoListResponse>('/photos', params),

  getById: (spaceCode: string, photoId: number) =>
    authHttp.get<Photo>(`/spaces/${spaceCode}/photos/${photoId}`),

  getBySpaceCode: (
    spaceCode: string,
    params?: { page?: number; size?: number },
  ) => authHttp.get<PhotoListResponse>(`/spaces/${spaceCode}/photos`, params),

  create: (data: CreatePhotoInput) => authHttp.post<Photo>('/photos', data),

  uploadFiles: (spaceCode: string, files: File[]) => {
    const formData = new FormData();
    files.forEach((file) => formData.append('files', file));
    return http.post(
      `/spaces/${spaceCode}/photos/upload`,
      formData,
      'form-data',
    );
  },

  downloadAll: (spaceCode: string) =>
    authHttp.post<AllDownloadInfos>(
      `/spaces/${spaceCode}/photos/download`,
      undefined,
    ),

  // TODO : 반환값 타입 수정
  downloadPhotos: (spaceCode: string, photoIds: PhotoIds) =>
    authHttp.post<SelectedDownloadInfos>(
      `/spaces/${spaceCode}/photos/download/selected`,
      photoIds,
    ),

  downloadSinglePhoto: (spaceCode: string, photoId: number) =>
    authHttp.post<SingleDownloadInfos>(
      `/spaces/${spaceCode}/photos/download/${photoId}`,
      photoId,
    ),

  deletePhotos: (spaceCode: string, photoIds: PhotoIds) =>
    authHttp.delete<void>(
      `/spaces/${spaceCode}/photos/selected`,
      photoIds,
      'json',
    ),

  deletePhoto: (spaceCode: string, photoId: number) =>
    authHttp.delete<void>(`/spaces/${spaceCode}/photos/${photoId}`),
};
