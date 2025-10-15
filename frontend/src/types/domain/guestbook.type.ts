import type { LocalFile, UploadFile } from '../file.type';
import type { Photo } from '../photo.type';

export interface GuestbookFunnelInfo {
  message: string;
  photos: LocalFile[];
  nickname: string;
}

export interface FunnelBaseElementProps {
  prompt: string;
  receiver: string;
  isOptional?: boolean;
  element: React.ReactNode;
  onNextButtonClick: () => void;
  nextButtonDisabled?: boolean;
  buttonText?: string;
}

export interface GuestbookFunnelPhotos {
  photos: UploadFile[];
}

export interface GuestbookImageType {
  originalName: string;
  uploadFileName: string;
  capacity: number;
}

export interface GuestbookForm {
  nickname: string;
  message: string;
  photos: GuestbookImageType[];

export interface GuestbookCard {
  id: number;
  nickname: string;
  message: string;
  createdAt: string | Date;
  photos: Photo[];
}

export interface GuestbookList {
  guestBookCards: GuestbookElement[];
  currentPage: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
}

export type GuestbookListSort = 'id' | 'createdAt';

export interface GuestbookListQuery {
  page: number;
  size: number;
  sort?: GuestbookListSort;
}

export interface GuestbookElement {
  id: number;
  nickname: string;
  containsPhoto: boolean;
  isRead: boolean;
}
