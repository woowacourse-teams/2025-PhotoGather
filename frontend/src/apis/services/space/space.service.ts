import type { SpaceInfo } from '../../../types/domain/space.type';
import { http } from '../../http';

export const spaceService = {
  getSpaceInfo: (spaceCode: string) =>
    http.get<SpaceInfo>(`/spaces/${spaceCode}`),
};
