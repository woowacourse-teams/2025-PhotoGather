import { KAKAO_CHANNEL_URL } from '../../../../constants/constants';
import {
  createCreateGuestbookRoute,
  createGuestGuestbookRoute,
  createGuestWorkListRoute,
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
  {
    path: KAKAO_CHANNEL_URL,
    name: '문의하기',
    external: true,
  },
];

export const guestNavigateInfo = (spaceCode: string): NavigateInfo[] => [
  {
    path: createGuestWorkListRoute(spaceCode),
    name: '작품 목록',
  },
  {
    path: createCreateGuestbookRoute(spaceCode),
    name: '방명록 작성하기',
  },
  {
    path: createGuestGuestbookRoute(spaceCode),
    name: '방명록 구경하기',
  },
  {
    path: KAKAO_CHANNEL_URL,
    name: '문의하기',
    external: true,
  },
];
