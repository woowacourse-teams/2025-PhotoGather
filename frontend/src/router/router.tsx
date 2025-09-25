import { lazy, Suspense } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import Layout from '../components/layout/global/layout/Layout';
import type { AppRouteObject } from '../types/route.type';

const KakaoAuthPage = lazy(() => import('../pages/auth/KakaoAuthPage'));
const DownloadCompletePage = lazy(
  () => import('../pages/complete/DownloadCompletePage'),
);
const UploadCompletePage = lazy(
  () => import('../pages/complete/UploadCompletePage'),
);
const SpaceCreateFunnel = lazy(
  () => import('../pages/create/funnel/SpaceCreateFunnel'),
);
const NetworkErrorPage = lazy(() => import('../pages/error/NetworkErrorPage'));
const NotFoundErrorPage = lazy(
  () => import('../pages/error/NotFoundErrorPage'),
);
const ImageUploadPage = lazy(
  () => import('../pages/guest/imageUploadPage/ImageUploadPage'),
);
const SharePage = lazy(() => import('../pages/guest/sharePage/SharePage'));
const InAppBrowserPage = lazy(
  () => import('../pages/inAppBrowser/InAppBrowserPage'),
);
const LandingPage = lazy(() => import('../pages/landing/LandingPage'));
const LoginPage = lazy(() => import('../pages/login/LoginPage'));
const LogoutPage = lazy(() => import('../pages/logout/LogoutPage'));
const MainPage = lazy(() => import('../pages/MainPage'));
const DashboardPage = lazy(
  () => import('../pages/manager/dashboard/DashboardPage'),
);
const SettingsPage = lazy(
  () => import('../pages/manager/settings/SettingsPage'),
);
const SpaceHomePage = lazy(
  () => import('../pages/manager/spaceHome/SpaceHomePage'),
);
const MyPage = lazy(() => import('../pages/mypage/MyPage'));
const PrivacyConsentPage = lazy(
  () => import('../pages/policies/PrivacyConsentPage'),
);
const PrivacyPolicyPage = lazy(
  () => import('../pages/policies/PrivacyPolicyPage'),
);
const TermsOfServicePage = lazy(
  () => import('../pages/policies/TermsOfServicePage'),
);

const withSuspense = (element: React.ReactNode) => (
  <Suspense fallback={<div>불러오는 중...</div>}>{element}</Suspense>
);

const routes: AppRouteObject[] = [
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/',
        element: withSuspense(<MainPage />),
        handle: {
          header: true,
          starField: true,
          highlight: true,
        },
      },
      {
        path: '/landing',
        element: withSuspense(<LandingPage />),
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
        element: withSuspense(<SpaceCreateFunnel />),
      },
      {
        path: 'space/:spaceCode',
        element: withSuspense(<SpaceHomePage />),
        handle: {
          header: true,
          starField: true,
          highlight: true,
        },
      },

      {
        path: 'space/:spaceCode/dashboard',
        element: withSuspense(<DashboardPage />),
        handle: {
          header: true,
          highlight: true,
        },
      },
      {
        path: 'space/:spaceCode/settings',
        element: withSuspense(<SettingsPage />),
        handle: {
          header: true,
          highlight: true,
        },
      },
      {
        path: 'guest/image-upload/:spaceCode',
        element: withSuspense(<ImageUploadPage />),
        handle: {
          starField: true,
          highlight: true,
          isInAppBrowserAllow: true,
        },
      },
      {
        path: 'share',
        element: withSuspense(<SharePage />),
      },
      {
        path: 'mypage',
        element: withSuspense(<MyPage />),
        handle: {
          header: true,
          highlight: true,
        },
      },
      {
        path: 'logout',
        element: withSuspense(<LogoutPage />),
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
            element: withSuspense(<UploadCompletePage />),
            handle: {
              isInAppBrowserAllow: true,
            },
          },
          {
            path: 'download',
            element: withSuspense(<DownloadCompletePage />),
          },
        ],
      },
      {
        path: 'login',
        element: withSuspense(<LoginPage />),
      },
      {
        path: 'auth',
        children: [
          {
            path: 'login',
            children: [
              {
                path: 'kakao',
                element: withSuspense(<KakaoAuthPage />),
              },
            ],
          },
        ],
      },
      {
        path: 'policy',
        children: [
          {
            path: 'privacy-policy',
            element: withSuspense(<PrivacyPolicyPage />),
          },
          {
            path: 'terms-of-service',
            element: withSuspense(<TermsOfServicePage />),
          },
          {
            path: 'privacy-consent',
            element: withSuspense(<PrivacyConsentPage />),
          },
        ],
      },
      {
        path: 'in-app-browser',
        element: withSuspense(<InAppBrowserPage />),
      },
      {
        path: 'network-error',
        element: withSuspense(<NetworkErrorPage />),
      },
      {
        path: '*',
        element: withSuspense(<NotFoundErrorPage />),
      },
    ],
  },
];

const router = createBrowserRouter(routes);

export default router;
