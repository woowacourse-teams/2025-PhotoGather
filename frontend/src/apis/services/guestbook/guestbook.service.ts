import type {
  GuestbookCard,
  GuestbookForm,
  GuestbookList,
  GuestbookListQuery,
} from '../../../types/domain/guestbook.type';
import { http } from '../../http';

export const guestbookService = {
  createGuestbook: (spaceCode: string, data: GuestbookForm) => {
    return http.post(`/spaces/${spaceCode}/guestbook`, data);
  },

  getList: (spaceCode: string, query?: GuestbookListQuery) =>
    http.get<GuestbookList>(`/spaces/${spaceCode}/guestbook`, { ...query }),

  getDetail: (spaceCode: string, guestbookCardId: number | string) =>
    http.get<GuestbookCard>(
      `/spaces/${spaceCode}/guestbook/${guestbookCardId}`,
    ),

  deleteCard: (spaceCode: string, guestbookCardId: number | string) =>
    http.delete(`/spaces/${spaceCode}/guestbook/${guestbookCardId}`),

  deleteGuestbookCardPhotos: (
    spaceCode: string,
    guestBookCardId: number,
    deletePhotoIds: number[],
  ) => {
    return http.delete(
      `/spaces/${spaceCode}/guestbook/${guestBookCardId}/photos`,
      { deletePhotoIds },
    );
  },
};
