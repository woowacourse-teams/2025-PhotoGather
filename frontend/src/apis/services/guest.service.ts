import type {
  ApiResponse,
  GuestCreate,
  GuestNickName,
} from '../../types/api.type';
import type { GuestInfo } from '../../types/guest.type';
import { http } from '../http';

export const guestService = {
  createNickName: (data: GuestCreate): Promise<ApiResponse<GuestInfo>> =>
    http.post('/guests', data),

  patchNickName: (guestId: string, data: GuestNickName) =>
    http.patch(`/guests/${guestId}`, data),
};
