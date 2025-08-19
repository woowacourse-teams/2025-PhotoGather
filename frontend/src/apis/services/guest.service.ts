import type { GuestCreate, GuestNickName } from '../../types/api.type';
import { http } from '../http';

export const guestService = {
  createNickName: (data: GuestCreate) => http.post('/guests', data),

  patchNickName: (guestId: string, data: GuestNickName) =>
    http.patch(`/guests/${guestId}`, data),
};
