import type { PhotoListResponse } from '../types/api.type';
import type {
  CreatePhotoInput,
  Photo,
  PhotoWithContent,
} from '../types/photo.type';
import type {
  CreateSpaceInput,
  Space,
  SpaceWithContents,
  UpdateSpaceInput,
} from '../types/space.type';
import type {
  CreateSpaceContentInput,
  SpaceContent,
} from '../types/space-content.type';
import { http } from './http';

// services/space.service.ts
export const spaceService = {
  getAll: (params?: { page?: number; limit?: number; search?: string }) =>
    http.get<Space[]>('/spaces', params),

  getById: (id: number) => http.get<Space>(`/spaces/${id}`),

  getWithContents: (id: number) =>
    http.get<SpaceWithContents>(`/spaces/${id}/contents`),

  create: (data: CreateSpaceInput) => http.post<Space>('/spaces', data),

  update: (id: number, data: UpdateSpaceInput) =>
    http.patch<Space>(`/spaces/${id}`, data),

  delete: (id: number) => http.delete<void>(`/spaces/${id}`),
};

// services/space-content.service.ts
export const spaceContentService = {
  create: (data: CreateSpaceContentInput) =>
    http.post<SpaceContent>('/space-contents', data),

  getBySpaceId: (spaceId: number) =>
    http.get<SpaceContent[]>(`/spaces/${spaceId}/contents`),

  delete: (id: number) => http.delete<void>(`/space-contents/${id}`),
};

// services/photo.service.ts
export const photoService = {
  getAll: (params?: { page?: number; pageSize?: number }) =>
    http.get<PhotoListResponse>('/photos', params),

  getById: (id: number) => http.get<Photo>(`/photos/${id}`),

  getBySpaceId: (
    spaceId: number,
    params?: { page?: number; pageSize?: number },
  ) => http.get<PhotoListResponse>(`/spaces/${spaceId}/photos`, params),

  create: (data: CreatePhotoInput) => http.post<Photo>('/photos', data),

  upload: (file: File, spaceContentId: number) =>
    uploadFile<Photo>('/photos/upload', file, { spaceContentId }),

  delete: (id: number) => http.delete<void>(`/photos/${id}`),

  getWithContent: (id: number) =>
    http.get<PhotoWithContent>(`/photos/${id}/content`),
};
