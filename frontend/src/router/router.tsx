import { createBrowserRouter } from 'react-router-dom';
import Layout from '../components/layout/global/layout/Layout';
import CompletePage from '../pages/guest/completePage/CompletePage';
import GuestBookFunnel from '../pages/guest/guestbookPage/funnel/GuestbookFunnel';
import GuestMainPage from '../pages/guest/mainpage/GuestMainPage';
import GuestWorkDetail from '../pages/guest/workDetail/GuestWorkDetail';
import GuestbookCardPage from '../pages/host/guestbook/card/GuestbookCardPage';
import GuestbookListPage from '../pages/host/guestbook/list/GuestbookListPage';
import HostMainPage from '../pages/host/mainPage/HostMainPage';
import MyPage from '../pages/host/mypage/MyPage';
import SharePage from '../pages/host/share/SharePage';
import SpaceCreateFunnel from '../pages/host/spaceCreate/funnel/SpaceCreateFunnel';
import SpaceEditPage from '../pages/host/spaceEditPage/SpaceEditPage';
import SpaceInfoPage from '../pages/host/spaceInfoPage/SpaceInfoPage';
import HostWorkDetail from '../pages/host/workDetail/HostWorkDetail';
import WorkForm from '../pages/host/workForm/WorkForm';
import MainPage from '../pages/MainPage';
import type { AppRouteObject } from '../types/route.type';

const routes: AppRouteObject[] = [
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <MainPage />,
      },
      {
        path: 'host',
        children: [
          {
            path: ':spaceCode/main',
            element: <HostMainPage />,
            handle: {
              headerIcons: ['share', 'settings'],
            },
          },
          {
            path: ':spaceCode/space-info',
            element: <SpaceInfoPage />,
            handle: {
              headerIcons: ['settings'],
            },
          },
          {
            path: 'my-page',
            element: <MyPage />,
            handle: {
              highlight: true,
              headerIcons: ['settings'],
              noFooter: true,
            },
          },
          {
            path: ':spaceCode/space-info/edit',
            element: <SpaceEditPage />,
            handle: {
              headerIcons: ['settings'],
            },
          },
          {
            path: 'create-space',
            element: <SpaceCreateFunnel />,
            handle: {
              noFooter: true,
            },
          },
          {
            path: ':spaceCode/work-detail',
            element: <HostWorkDetail />,
          },
          {
            path: ':spaceCode/work-detail/edit',
            element: <WorkForm />,
          },
          {
            path: 'share',
            element: <SharePage />,
            handle: {
              noFooter: true,
            },
          },
          {
            path: ':spaceCode/guestbook',
            element: <GuestbookListPage />,
            handle: {
              headerIcons: ['share', 'settings'],
            },
          },
          {
            path: ':spaceCode/guestbook/:guestbookCardId',
            element: <GuestbookCardPage />,
          },
        ],
      },
      {
        path: 'guest',
        children: [
          {
            path: 'main',
            element: <GuestMainPage />,
          },
          {
            path: ':spaceCode/create-guestbook',
            element: <GuestBookFunnel />,
            handle: {
              noFooter: true,
            },
          },
          {
            path: 'create-guestbook-complete',
            element: <CompletePage />,
          },
          {
            path: ':spaceCode/work-detail',
            element: <GuestWorkDetail />,
          },
        ],
      },
    ],
  },
];

const router = createBrowserRouter(routes);

export default router;
