export interface Space {
  id: number;
  spaceCode: string;
  name: string;
  openedAt: Date | string;
  expiredAt: Date | string;
  createdAt: Date | string;
  updatedAt: Date | string;
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

export interface SpaceContent {
  id: number;
  contentType: string;
  spaceId: number;
}

export interface CreateSpaceContentInput {
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

export interface CreatePhotoInput {
  id: number;
  path: string;
  originalName: string;
  capturedAt?: Date | string | null;
}

export interface PhotoWithContent extends Photo {
  contentType: string;
  spaceId: number;
}

export interface SpaceWithContents extends Space {
  contents: SpaceContent[];
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}
