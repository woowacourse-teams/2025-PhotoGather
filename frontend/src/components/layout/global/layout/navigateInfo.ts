import {
  createCreateGuestbookRoute,
  createGuestGuestbookRoute,
  createGuestWorkDetailRoute,
  ROUTES,
} from '../../../../constants/routes';
import type { NavigateInfo } from '../../../../types/route.type';

export const hostNavigateInfo = (): NavigateInfo[] => [
  {
    path: ROUTES.HOST.MAIN,
    name: '메인 페이지',
  },
  {
    path: ROUTES.HOST.MY_PAGE,
    name: '마이 페이지',
  },
];

export const guestNavigateInfo = (spaceCode: string): NavigateInfo[] => [
  {
    path: createGuestWorkDetailRoute(spaceCode),
    name: '작품 소개',
  },
  {
    path: createCreateGuestbookRoute(spaceCode),
    name: '방명록 작성하기',
  },
  {
    path: createGuestGuestbookRoute(spaceCode),
    name: '방명록 구경하기',
  },
];
