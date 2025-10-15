import type {
  GuestbookCard,
  GuestbookList,
  GuestbookListQuery,
} from '../../../types/domain/guestbook.type';
import { http } from '../../http';

export const guestbookService = {
  getList: (spaceCode: string, query?: GuestbookListQuery) =>
    http.get<GuestbookList>(`/spaces/${spaceCode}/guestbook`, { ...query }),

  getDetail: (spaceCode: string, guestbookCardId: number | string) =>
    http.get<GuestbookCard>(
      `/spaces/${spaceCode}/guestbook/${guestbookCardId}`,
    ),
};
