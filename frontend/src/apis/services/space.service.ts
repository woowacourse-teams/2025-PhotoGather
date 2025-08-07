import type {
  Space,
  SpaceCreateInfo,
  SpaceWithContents,
  UpdateSpaceInput,
} from '../../types/space.type';
import { http } from '../http';

export const spaceService = {
  create: (data: SpaceCreateInfo) =>
    http.post<{ spaceCode: string }>('/spaces', data),

  getAll: (params?: { page?: number; limit?: number; search?: string }) =>
    http.get<Space[]>('/spaces', params),

  getById: (id: number) => http.get<Space>(`/spaces/${id}`),

  getWithContents: (id: number) =>
    http.get<SpaceWithContents>(`/spaces/${id}/contents`),

  update: (id: number, data: UpdateSpaceInput) =>
    http.patch<Space>(`/spaces/${id}`, data),

  delete: (id: number) => http.delete<void>(`/spaces/${id}`),
};
