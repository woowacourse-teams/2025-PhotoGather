import type { Photo } from '../photo.type';

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
