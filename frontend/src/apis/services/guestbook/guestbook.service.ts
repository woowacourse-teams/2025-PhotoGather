import type { GuestbookForm } from '../../../types/domain/guestbook.type';
import { http } from '../../http';

export const guestbookService = {
  createGuestbook: (spaceCode: string, data: GuestbookForm) => {
    return http.post(`/spaces/${spaceCode}/guestbook`, data);
  },
};
