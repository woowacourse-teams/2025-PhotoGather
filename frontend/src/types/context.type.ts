import type { SpaceInfo } from './domain/space.type';

export interface SpaceInfoContextType {
  spaceInfo: SpaceInfo;
  isLoading: boolean;
  isError: boolean;
}
