import type { MySpace, Space, SpaceCreateInfo } from '../../types/space.type';
import { authHttp, http } from '../http';

export const spaceService = {
  create: (data: SpaceCreateInfo) =>
    authHttp.post<{ spaceCode: string }>('/spaces', data),

  getInfoByCode: (spaceCode: string) => http.get<Space>(`/spaces/${spaceCode}`),

  update: (spaceCode: string, data: Partial<SpaceCreateInfo>) =>
    authHttp.patch<SpaceCreateInfo>(`/spaces/${spaceCode}`, data),

  delete: (spaceCode: string) => authHttp.delete<void>(`/spaces/${spaceCode}`),

  getMySpaces: () => authHttp.get<MySpace[]>('/spaces/me'),
};
