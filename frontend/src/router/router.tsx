import { createBrowserRouter } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import DownloadCompletePage from '../pages/complete/DownloadCompletePage';
import UploadCompletePage from '../pages/complete/UploadCompletePage';
import SpaceCreateFunnel from '../pages/create/funnel/SpaceCreateFunnel';
import DemoHome from '../pages/demo/DemoHome';
import NetworkErrorPage from '../pages/error/NetworkErrorPage';
import NotFoundErrorPage from '../pages/error/NotFoundErrorPage';
import ImageUploadPage from '../pages/guest/imageUploadPage/ImageUploadPage';
import SharePage from '../pages/guest/sharePage/SharePage';
import LandingPage from '../pages/landing/LandingPage';
import DashboardPage from '../pages/manager/dashboard/DashboardPage';
import SettingsPage from '../pages/manager/settings/SettingsPage';
import SpaceHomePage from '../pages/manager/spaceHome/SpaceHomePage';
import PrivacyPolicyPage from '../pages/privacyPolicy/PrivacyPolicyPage';
import type { AppRouteObject } from '../types/route.type';

const routes: AppRouteObject[] = [
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <LandingPage />,
        handle: {
          header: true,
          starField: true,
          highlight: true,
        },
      },
      {
        path: '/demo',
        element: <DemoHome />,
        handle: {
          header: true,
        },
      },
      {
        path: 'create',
        element: <SpaceCreateFunnel />,
      },
      {
        path: 'manager',
        children: [
          {
            path: 'space-home/:spaceCode',
            element: <SpaceHomePage />,
            handle: {
              header: true,
              starField: true,
              highlight: true,
            },
          },
          {
            path: 'space-home/:spaceCode/dashboard',
            element: <DashboardPage />,
            handle: {
              header: true,
              starField: true,
              highlight: true,
            },
          },
          {
            path: 'space-home/:spaceCode/settings',
            element: <SettingsPage />,
            handle: {
              header: true,
              starField: true,
              highlight: true,
            },
          },
        ],
      },
      {
        // TODO : 데모 후 삭제
        path: 'guest',
        children: [
          {
            path: 'image-upload/:spaceCode',
            element: <ImageUploadPage />,
            handle: {
              starField: true,
              highlight: true,
            },
          },
          {
            path: 'share',
            element: <SharePage />,
          },
        ],
      },
      {
        path: 'complete',
        children: [
          {
            path: 'upload',
            element: <UploadCompletePage />,
          },
          {
            path: 'download',
            element: <DownloadCompletePage />,
          },
        ],
      },
      {
        path: 'privacy-policy',
        element: <PrivacyPolicyPage />,
      },
      {
        path: 'network-error',
        element: <NetworkErrorPage />,
      },
      {
        path: '*',
        element: <NotFoundErrorPage />,
      },
    ],
  },
];

const router = createBrowserRouter(routes);

export default router;
