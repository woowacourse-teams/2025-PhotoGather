import { createBrowserRouter } from 'react-router-dom';
import Layout from '../components/layout/global/layout/Layout';
import GuestWorkDetail from '../pages/guest/workDetail/GuestWorkDetail';
import Dashboard from '../pages/host/dashboard/Dashboard';
import HostMainPage from '../pages/host/mainPage/HostMainPage';
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
