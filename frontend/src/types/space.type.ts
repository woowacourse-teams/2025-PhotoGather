import type { SpaceContent } from './spaceContent.type';

export interface SpaceCreateInfo {
  name: string;
  openedAt: string;
  password: string;
}

export interface SpaceFunnelInfo {
  name: string;
  date: string;
  time: string;
}

export interface Space {
  id: number;
  spaceCode: string;
  name: string;
  openedAt: Date | string;
  expiredAt: Date | string;
  createdAt: Date | string;
  updatedAt: Date | string;
}

export interface SpaceWithContents extends Space {
  contents: SpaceContent[];
}

export interface UpdateSpaceInput {
  spaceCode?: string;
  name?: string;
  openedAt?: Date | string;
  expiredAt?: Date | string;
}
