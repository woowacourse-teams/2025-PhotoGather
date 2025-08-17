import type {
  Space,
  SpaceCreateInfo,
  UpdateSpaceInput,
} from '../../types/space.type';
import { http } from '../http';

export const spaceService = {
  create: (data: SpaceCreateInfo) =>
    http.post<{ spaceCode: string }>('/space', data),

  getInfoByCode: (spaceCode: string) => http.get<Space>(`/spaces/${spaceCode}`),

  update: (id: number, data: UpdateSpaceInput) =>
    http.patch<Space>(`/spaces/${id}`, data),

  delete: (id: number) => http.delete<void>(`/spaces/${id}`),
};
