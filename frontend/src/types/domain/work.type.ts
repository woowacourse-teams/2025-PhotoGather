export interface WorkDetail {
  title: string;
  category: string;
  authorName: string;
  description: string;
  photos: WorkPhoto[];
  videoUrl: string;
  isVideoAfterPhoto: boolean;
}

export interface WorkPhoto {
  id: number;
  path: string;
  originalName: string;
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
