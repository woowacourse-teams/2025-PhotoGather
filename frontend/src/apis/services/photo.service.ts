import type {
  CancelFileNames,
  PhotoIds,
  PhotoListResponse,
  PresignedUrlsResponse,
  UploadedPhotos,
} from '../../types/api.type';
import type {
  CreatePhotoInput,
  DownloadInfoList,
  Photo,
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

  uploadFiles: (spaceCode: string, files: File[], guestId: number) => {
    const formData = new FormData();
    files.forEach((file) => formData.append('files', file));
    return http.post(
      `/spaces/${spaceCode}/photos/upload?guestId=${guestId}`,
      formData,
      'form-data',
    );
  },

  getPresignedUrls: (spaceCode: string, uploadFileNames: string[]) =>
    http.post<PresignedUrlsResponse>(
      `/spaces/${spaceCode}/photos/issue/upload-urls`,
      { uploadFileNames },
    ),

  notifyUploadComplete: (
    spaceCode: string,
    uploadedPhotos: UploadedPhotos[],
    validGuestId: number,
    nickName: string,
  ) =>
    http.post(`/spaces/${spaceCode}/photos?guestId=${validGuestId}`, {
      nickName,
      uploadedPhotos,
    }),

  uploadPhotosToS3: async (presignedUrl: string, file: File) =>
    http.putToS3(presignedUrl, file),

  downloadAll: (spaceCode: string) =>
    authHttp.post<DownloadInfoList>(
      `/spaces/${spaceCode}/photos/issue/download-urls`,
      undefined,
    ),

  downloadPhotos: (spaceCode: string, photoIds: PhotoIds) =>
    authHttp.post<DownloadInfoList>(
      `/spaces/${spaceCode}/photos/issue/download-urls/selected`,
      photoIds,
    ),

  downloadSinglePhoto: (spaceCode: string, photoId: number) =>
    authHttp.post<DownloadInfoList>(
      `/spaces/${spaceCode}/photos/issue/download-urls/${photoId}`,
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

  cancelUpload: (
    spaceCode: string,
    cancelFileNames: CancelFileNames,
    guestId: number,
  ) =>
    http.post<void>(
      `/spaces/${spaceCode}/photos/upload/cancel?guestId=${guestId}`,
      cancelFileNames,
    ),
};
