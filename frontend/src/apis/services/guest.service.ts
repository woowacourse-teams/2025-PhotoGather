import type { ApiResponse, GuestNickName } from '../../types/api.type';
import type { GuestInfo } from '../../types/guest.type';
import { http } from '../http';

export const guestService = {
  getGuestId: (spaceCode: string, guestId: string) =>
    http.get(`/spaces/${spaceCode}/guests/${guestId}`),

  createNickName: (
    spaceCode: string,
    data: GuestNickName,
  ): Promise<ApiResponse<GuestInfo>> =>
    http.post(`/spaces/${spaceCode}/guests`, data),

  patchNickName: (spaceCode: string, guestId: string, data: GuestNickName) =>
    http.patch(`/spaces/${spaceCode}/guests/${guestId}`, data),
};

// guestId가 있다면 patch를 불러야 하고, 아닐 경우엔 post를 불러야 함
