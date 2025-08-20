import type { GuestInfo, GuestNickName } from '../../types/guest.type';
import { http } from '../http';

export const guestService = {
  getGuestId: (spaceCode: string, guestId: string) =>
    http.get<GuestInfo>(`/spaces/${spaceCode}/guests/${guestId}`),

  createNickName: (spaceCode: string, data: GuestNickName) =>
    http.post<GuestInfo>(`/spaces/${spaceCode}/guests`, data),

  patchNickName: (spaceCode: string, guestId: string, data: GuestNickName) =>
    http.patch<GuestInfo>(`/spaces/${spaceCode}/guests/${guestId}`, data),
};

// guestId가 있다면 patch를 불러야 하고, 아닐 경우엔 post를 불러야 함
