import type { MySpace, SpaceInfo } from '../../../types/domain/space.type';
import { http } from '../../http';

export const spaceService = {
  create: (data: FormData) => http.post<{ spaceCode: string }>('/spaces', data),

  getSpaceInfo: (spaceCode: string) =>
    http.get<SpaceInfo>(`/spaces/${spaceCode}`),

  deleteSpace: (spaceCode: string) => http.delete(`/spaces/${spaceCode}`),

  patchSpaceInfo: (spaceCode: string, data: FormData) =>
    http.patch(`/spaces/${spaceCode}`, data),

  getMySpaces: () => http.get<{ spaces: MySpace[] }>('/spaces/me'),

  getIsSpaceOwner: (spaceCode: string) =>
    http.get<{ isSpaceHost: boolean }>(`/spaces/${spaceCode}/host-check`),
};
