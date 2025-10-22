import {
  createCreateGuestbookRoute,
  createGuestbookRoute,
  createGuestGuestbookRoute,
  createGuestWorkDetailRoute,
  createWorkDetailRoute,
} from '../../../../constants/routes';
import type { NavigateInfo } from '../../../../types/route.type';

export const hostNavigateInfo = (spaceCode: string): NavigateInfo[] => [
  {
    path: createWorkDetailRoute(spaceCode),
    name: '작품 소개 관리',
  },
  {
    path: createGuestbookRoute(spaceCode),
    name: '방명록 관리',
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
