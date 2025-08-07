import { ROUTES } from '../constants/routes';

export const createSpaceUrl = (spaceId: string) =>
  process.env.DOMAIN + ROUTES.MANAGER.SPACE_HOME(spaceId);
