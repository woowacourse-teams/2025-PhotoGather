import type { GuestInfo, GuestNickName } from '../../types/guest.type';
import { http } from '../http';

export const guestService = {
  getGuestId: (spaceCode: string, guestId: number) =>
    http.get<GuestInfo>(`/spaces/${spaceCode}/guests/${guestId}`),

  createNickName: (spaceCode: string, data: GuestNickName) =>
    http.post<GuestInfo>(`/spaces/${spaceCode}/guests`, data),

  patchNickName: (spaceCode: string, guestId: number, data: GuestNickName) =>
    http.patch<GuestInfo>(`/spaces/${spaceCode}/guests/${guestId}`, data),
};
