import { createBrowserRouter } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import KakaoAuthPage from '../pages/auth/KakaoAuthPage';
import DownloadCompletePage from '../pages/complete/DownloadCompletePage';
import UploadCompletePage from '../pages/complete/UploadCompletePage';
import SpaceCreateFunnel from '../pages/create/funnel/SpaceCreateFunnel';
import NetworkErrorPage from '../pages/error/NetworkErrorPage';
import NotFoundErrorPage from '../pages/error/NotFoundErrorPage';
import ImageUploadPage from '../pages/guest/imageUploadPage/ImageUploadPage';
import SharePage from '../pages/guest/sharePage/SharePage';
import LandingPage from '../pages/landing/LandingPage';
import LoginPage from '../pages/login/LoginPage';
import LogoutPage from '../pages/logout/LogoutPage';
import MainPage from '../pages/MainPage';
import DashboardPage from '../pages/manager/dashboard/DashboardPage';
import SettingsPage from '../pages/manager/settings/SettingsPage';
import SpaceHomePage from '../pages/manager/spaceHome/SpaceHomePage';
import MyPage from '../pages/mypage/MyPage';
import PrivacyConsentPage from '../pages/policies/PrivacyConsentPage';
import PrivacyPolicyPage from '../pages/policies/PrivacyPolicyPage';
import TermsOfServicePage from '../pages/policies/TermsOfServicePage';
import type { AppRouteObject } from '../types/route.type';

const routes: AppRouteObject[] = [
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <MainPage />,
        handle: {
          header: true,
          starField: true,
          highlight: true,
        },
      },
      {
        path: '/landing',
        element: <LandingPage />,
        handle: {
          header: true,
          starField: true,
          highlight: true,
        },
      },
      // {
      //   path: '/demo',
      //   element: <DemoHome />,
      //   handle: {
      //     header: true,
      //   },
      // },
      {
        path: 'create',
        element: <SpaceCreateFunnel />,
      },
      {
        path: 'space/:spaceCode',
        element: <SpaceHomePage />,
        handle: {
          header: true,
          starField: true,
          highlight: true,
        },
      },

      {
        path: 'space/:spaceCode/dashboard',
        element: <DashboardPage />,
        handle: {
          header: true,
          highlight: true,
        },
      },
      {
        path: 'space/:spaceCode/settings',
        element: <SettingsPage />,
        handle: {
          header: true,
          highlight: true,
        },
      },
      {
        path: 'upload/:spaceCode',
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
      {
        path: 'mypage',
        element: <MyPage />,
        handle: {
          header: true,
          highlight: true,
        },
      },
      {
        path: 'logout',
        element: <LogoutPage />,
        handle: {
          header: true,
          highlight: true,
        },
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
        path: 'login',
        element: <LoginPage />,
      },
      {
        path: 'auth',
        children: [
          {
            path: 'login',
            children: [
              {
                path: 'kakao',
                element: <KakaoAuthPage />,
              },
            ],
          },
        ],
      },
      {
        path: 'policy',
        children: [
          { path: 'privacy-policy', element: <PrivacyPolicyPage /> },
          { path: 'terms-of-service', element: <TermsOfServicePage /> },
          { path: 'privacy-consent', element: <PrivacyConsentPage /> },
        ],
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
