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

export interface CreateSpaceContentInput {
  contentType: string;
  spaceId: number;
}

export interface CreatePhotoInput {
  id: number;
  path: string;
  originalName: string;
  capturedAt?: Date | string | null;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}
