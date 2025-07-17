export interface Space {
  id: number;
  spaceCode: string;
  name: string;
  openedAt: Date | string;
  expiredAt: Date | string;
  createdAt: Date | string;
  updatedAt: Date | string;
}

export interface SpaceContent {
  id: number;
  contentType: string;
  spaceId: number;
}

export interface Photo {
  id: number;
  path: string;
  originalName: string;
  capturedAt: Date | string | null;
  createdAt: Date | string;
}

export interface PhotoWithContent extends Photo {
  contentType: string;
  spaceId: number;
}

export interface SpaceWithContents extends Space {
  contents: SpaceContent[];
}
