import type { Photo } from '../photo.type';

export interface GuestbookCard {
  id: number;
  nickname: string;
  message: string;
  createdAt: string | Date;
  photos: Photo[];
}
