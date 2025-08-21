import type {
  MySpace,
  Space,
  SpaceCreateInfo,
  UpdateSpaceInput,
} from '../../types/space.type';
import { authHttp, http } from '../http';

export const spaceService = {
  create: (data: SpaceCreateInfo) =>
    authHttp.post<{ spaceCode: string }>('/spaces', data),

  getInfoByCode: (spaceCode: string) => http.get<Space>(`/spaces/${spaceCode}`),

  update: (id: number, data: UpdateSpaceInput) =>
    authHttp.patch<Space>(`/spaces/${id}`, data),

  delete: (id: number) => authHttp.delete<void>(`/spaces/${id}`),

  getMySpaces: () => authHttp.get<MySpace[]>('/spaces/me'),
};
