import { createBrowserRouter } from 'react-router-dom';
import Layout from '../components/layout/global/layout/Layout';
import GuestMainPage from '../pages/guest/mainpage/GuestMainPage';
import Dashboard from '../pages/host/dashboard/Dashboard';
import HostMainPage from '../pages/host/mainPage/HostMainPage';
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
        ],
      },
      {
        path: 'guest',
        children: [
          {
            path: 'main',
            element: <GuestMainPage />,
          },
        ],
      },
    ],
  },
];

const router = createBrowserRouter(routes);

export default router;
