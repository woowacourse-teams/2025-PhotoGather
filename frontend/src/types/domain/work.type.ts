interface WorkBase {
  title: string;
  category: string;
  authorName: string;
  description: string;
  photos: WorkPhoto[];
  videoUrl: string;
  isVideoAfterPhoto: boolean;
}

export interface WorkDetail extends WorkBase {
  id: number;
}

export interface WorkSummary {
  id: number;
  title: string;
  category: string;
  videoUrl?: string;
  firstPhoto?: WorkPhoto | null;
}

export interface WorkListResponse {
  products: WorkSummary[];
}

export interface WorkPhoto {
  id: number;
  path: string;
  originalName: string;
  order?: number;
}

export interface PhotoUpload {
  originalName: string;
  uploadFileName: string;
  capacity: number;
}

export interface CreateWorkRequest {
  title: string;
  category: string;
  authorName: string;
  description: string;
  photos: PhotoUpload[];
  videoUrl?: string;
  isVideoAfterPhoto: boolean;
}

export interface UpdateWorkRequest {
  title?: string;
  category?: string;
  authorName?: string;
  description?: string;
  deletePhotoIds: number[];
  newPhotos: PhotoUpload[];
  videoUrl?: string;
  isVideoAfterPhoto?: boolean;
}
