import { createBrowserRouter } from 'react-router-dom';
import Layout from '../components/layout/global/layout/Layout';
import GuestMainPage from '../pages/guest/mainpage/GuestMainPage';
import GuestWorkDetail from '../pages/guest/workDetail/GuestWorkDetail';
import Dashboard from '../pages/host/dashboard/DashBoard';
import HostMainPage from '../pages/host/mainPage/HostMainPage';
import MyPage from '../pages/host/mypage/MyPage';
import SpaceCreateFunnel from '../pages/host/spaceCreate/funnel/SpaceCreateFunnel';
import SpaceEditPage from '../pages/host/spaceEditPage/SpaceEditPage';
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
            path: 'main',
            element: <HostMainPage />,
            handle: {
              headerIcons: ['share', 'settings'],
            },
          },
          {
            path: 'dashboard',
            element: <Dashboard />,
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
            },
          },
          {
            path: 'dashboard-edit',
            element: <SpaceEditPage />,
            handle: {
              headerIcons: ['settings'],
            },
          },
          {
            path: 'create-space',
            element: <SpaceCreateFunnel />,
            handle: {
              noHeader: true,
            },
          },
          {
            path: 'work-detail',
            element: <HostWorkDetail />,
          },
          {
            path: 'work-form',
            element: <WorkForm />,
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
            path: 'work-detail',
            element: <GuestWorkDetail />,
          },
        ],
      },
    ],
  },
];

const router = createBrowserRouter(routes);

export default router;
