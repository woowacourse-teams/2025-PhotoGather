import { ROUTES } from '../constants/routes';

export const createShareUrl = (spaceId: string) =>
  process.env.DOMAIN + ROUTES.GUEST.IMAGE_UPLOAD(spaceId);
