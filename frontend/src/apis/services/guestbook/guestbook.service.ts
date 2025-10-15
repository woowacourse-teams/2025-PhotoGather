import type { GuestbookCard } from '../../../types/domain/guestbook.type';
import { http } from '../../http';

export const guestbookService = {
  getDetail: (spaceCode: string, guestbookCardId: number | string) =>
    http.get<GuestbookCard>(
      `/spaces/${spaceCode}/guestbook/${guestbookCardId}`,
    ),
};
