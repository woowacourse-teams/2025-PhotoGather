import type { Guest } from './guest.type';

export interface Photo {
  id: number;
  path: string;
  originalName: string;
  guest: Guest;
  capturedAt: Date | string | null;
  createdAt: Date | string;
}

export interface PhotoWithContent extends Photo {
  contentType: string;
  spaceId: number;
}

export interface CreatePhotoInput {
  id: number;
  path: string;
  originalName: string;
  capturedAt?: Date | string | null;
}

export interface DownloadInfo {
  originalName: string;
  url: string;
}

export interface DownloadInfoList {
  downloadUrls: DownloadInfo[];
}
