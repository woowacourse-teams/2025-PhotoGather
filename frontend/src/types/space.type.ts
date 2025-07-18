import type { SpaceContent } from './spaceContent.type';

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

export interface CreateSpaceInput {
  spaceCode: string;
  name: string;
  openedAt: Date | string;
  expiredAt: Date | string;
}

export interface UpdateSpaceInput {
  spaceCode?: string;
  name?: string;
  openedAt?: Date | string;
  expiredAt?: Date | string;
}
