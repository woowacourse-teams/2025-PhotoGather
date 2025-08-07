import { ROUTES } from '../constants/routes';

export const createShareUrl = (spaceCode: string) =>
  process.env.DOMAIN + ROUTES.GUEST.IMAGE_UPLOAD(spaceCode);
