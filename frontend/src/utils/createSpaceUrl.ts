import { ROUTES } from '../constants/routes';

export const createShareUrl = (spaceCode: string) =>
  process.env.DOMAIN + ROUTES.GUEST.IMAGE_UPLOAD(spaceCode);

export const createSpaceUrl = (spaceCode: string) =>
  process.env.DOMAIN + ROUTES.MANAGER.SPACE_HOME(spaceCode);
