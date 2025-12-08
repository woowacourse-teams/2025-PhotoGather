import { lazy, Suspense } from 'react';
import { createBrowserRouter } from 'react-router-dom';

import { PrivateRoute } from '../components/context/privateRoute/PrivateRoute';
import SpaceInfoLayout from '../components/context/spaceInfoLayout/SpaceInfoLayout';
import Layout from '../components/layout/global/layout/Layout';
import GuestbookAccessGuard from '../components/layout/guestbookAccessGuard/GuestbookAccessGuard';
import HostPageAccessGuard from '../components/layout/hostPageAccessGuard/HostPageAccessGuard';
import type { AppRouteObject } from '../types/route.type';
import { Spinner } from '../styles/@common/Spinner.styles';

const KakaoAuthPage = lazy(() => import('../pages/auth/KakaoAuthPage'));
const CompletePage = lazy(
  () => import('../pages/guest/completePage/CompletePage'),
);
const GuestGuestbookCardPage = lazy(
  () => import('../pages/guest/guestbookPage/card/GuestGuestbookCardPage'),
);
const GuestBookFunnel = lazy(
  () => import('../pages/guest/guestbookPage/funnel/GuestbookFunnel'),
);
const GuestGuestbookListPage = lazy(
  () => import('../pages/guest/guestbookPage/list/GuestGuestbookListPage'),
);
const GuestSpaceHomePage = lazy(
  () => import('../pages/guest/spaceHomePage/GuestSpaceHomePage'),
);
const GuestWorkDetail = lazy(
  () => import('../pages/guest/workDetail/GuestWorkDetail'),
);
const GuestWorkListPage = lazy(
  () => import('../pages/guest/workList/GuestWorkListPage'),
);
const GuestbookCardPage = lazy(
  () => import('../pages/host/guestbook/card/GuestbookCardPage'),
);
const GuestbookListPage = lazy(
  () => import('../pages/host/guestbook/list/GuestbookListPage'),
);
const MainPage = lazy(() => import('../pages/host/mainPage/MainPage'));
const MyPage = lazy(() => import('../pages/host/mypage/MyPage'));
const SharePage = lazy(() => import('../pages/host/share/SharePage'));
const SpaceCreateFunnel = lazy(
  () => import('../pages/host/spaceCreate/funnel/SpaceCreateFunnel'),
);
const SpaceEditPage = lazy(
  () => import('../pages/host/spaceEditPage/SpaceEditPage'),
);
const HostSpaceHomePage = lazy(
  () => import('../pages/host/spaceHomePage/HostSpaceHomePage'),
);
const SpaceInfoPage = lazy(
  () => import('../pages/host/spaceInfoPage/SpaceInfoPage'),
);
const HostWorkDetail = lazy(
  () => import('../pages/host/workDetail/HostWorkDetail'),
);
const WorkForm = lazy(() => import('../pages/host/workForm/WorkForm'));
const WorkListPage = lazy(() => import('../pages/host/workList/WorkListPage'));
const InAppRedirectPage = lazy(
  () => import('../pages/inapp/InAppRedirectPage'),
);
const LandingPage = lazy(() => import('../pages/landing/LandingPage'));
const LoginPage = lazy(() => import('../pages/login/LoginPage'));
const NotFound = lazy(() => import('../pages/notFound/NotFound'));

interface SuspenseWrapperProps {
  element: React.ReactNode;
}

const SuspenseWrapper = ({ element }: SuspenseWrapperProps) => {
  return (
    <Suspense
      fallback={
        <div
          style={{
            display: 'flex',
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Spinner />
        </div>
      }
    >
      {element}
    </Suspense>
  );
};

const routes: AppRouteObject[] = [
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <SuspenseWrapper element={<LandingPage />} />,
        handle: {
          noHamburger: true,
          highlight: true,
          headerIcon: {
            leftIcon: 'logo',
          },
        },
      },
      {
        path: '/login',
        element: <SuspenseWrapper element={<LoginPage />} />,
        handle: {
          noHamburger: true,
          headerIcon: {
            leftIcon: 'logo',
          },
        },
      },
      {
        path: '/inapp',
        element: <SuspenseWrapper element={<InAppRedirectPage />} />,
      },
      {
        path: '/auth/login/kakao',
        element: <SuspenseWrapper element={<KakaoAuthPage />} />,
        handle: {
          headerIcon: {
            leftIcon: 'logo',
          },
        },
      },
      {
        path: 'host',
        children: [
          {
            path: '',
            element: <PrivateRoute />,
            children: [
              {
                path: 'main',
                element: <SuspenseWrapper element={<MainPage />} />,
                handle: {
                  highlight: true,
                  headerIcon: {
                    leftIcon: 'logo',
                  },
                  noFooter: true,
                },
              },
              {
                path: '',
                element: <HostPageAccessGuard />,
                handle: {
                  headerIcon: {
                    leftIcon: 'logo',
                  },
                },
                children: [
                  {
                    path: '',
                    element: <SpaceInfoLayout />,
                    children: [
                      {
                        path: ':spaceCode/home',
                        element: (
                          <SuspenseWrapper element={<HostSpaceHomePage />} />
                        ),
                        handle: {
                          // TODO : default를 logo와 hamburger로 변경 필요
                          headerIcon: {
                            leftIcon: 'logo',
                          },
                        },
                      },
                      {
                        path: ':spaceCode/space-info',
                        element: (
                          <SuspenseWrapper element={<SpaceInfoPage />} />
                        ),
                        handle: {
                          headerIcon: {
                            leftIcon: 'profile',
                          },
                        },
                      },
                      {
                        path: ':spaceCode/space-info/edit',
                        element: (
                          <SuspenseWrapper element={<SpaceEditPage />} />
                        ),
                        handle: {
                          headerIcon: {
                            leftIcon: 'profile',
                          },
                        },
                      },
                      {
                        path: ':spaceCode/work-detail/:workId',
                        element: (
                          <SuspenseWrapper element={<HostWorkDetail />} />
                        ),
                        handle: {
                          headerIcon: {
                            leftIcon: 'profile',
                          },
                        },
                      },
                      {
                        path: ':spaceCode/work-detail/:workId/edit',
                        element: <SuspenseWrapper element={<WorkForm />} />,
                        handle: {
                          noFooter: true,
                          headerIcon: {
                            leftIcon: 'profile',
                          },
                        },
                      },
                      {
                        path: ':spaceCode/guestbook',
                        element: (
                          <SuspenseWrapper element={<GuestbookListPage />} />
                        ),
                        handle: {
                          headerIcon: {
                            leftIcon: 'profile',
                          },
                        },
                      },
                      {
                        path: ':spaceCode/guestbook/:guestbookCardId',
                        element: (
                          <SuspenseWrapper element={<GuestbookCardPage />} />
                        ),
                        handle: {
                          headerIcon: {
                            leftIcon: 'profile',
                          },
                        },
                      },
                      {
                        path: ':spaceCode/work-list',
                        element: <SuspenseWrapper element={<WorkListPage />} />,
                        handle: {
                          headerIcon: {
                            leftIcon: 'profile',
                          },
                        },
                      },
                    ],
                  },
                ],
              },

              {
                path: 'my-page',
                element: <SuspenseWrapper element={<MyPage />} />,
                handle: {
                  headerIcon: {
                    leftIcon: 'logo',
                  },
                },
              },
              {
                path: 'create-space',
                element: <SuspenseWrapper element={<SpaceCreateFunnel />} />,
                handle: {
                  noFooter: true,
                  headerIcon: {
                    leftIcon: 'back',
                  },
                },
              },

              {
                path: 'share',
                element: <SuspenseWrapper element={<SharePage />} />,
                handle: {
                  noFooter: true,
                  headerIcon: {
                    leftIcon: 'logo',
                  },
                },
              },
            ],
          },
        ],
      },
      {
        path: 'guest',
        children: [
          {
            path: '',
            element: <SpaceInfoLayout />,
            children: [
              {
                path: ':spaceCode/home',
                element: <SuspenseWrapper element={<GuestSpaceHomePage />} />,
                handle: {
                  headerIcon: {
                    leftIcon: 'profile',
                  },
                },
              },
              {
                path: ':spaceCode/create-guestbook',
                element: <SuspenseWrapper element={<GuestBookFunnel />} />,
                handle: {
                  noFooter: true,
                  headerIcon: {
                    leftIcon: 'profile',
                  },
                },
              },
              {
                path: ':spaceCode/create-guestbook-complete',
                element: <SuspenseWrapper element={<CompletePage />} />,
                handle: {
                  headerIcon: {
                    leftIcon: 'profile',
                  },
                },
              },
              {
                path: ':spaceCode/work-detail/:workId',
                element: <SuspenseWrapper element={<GuestWorkDetail />} />,
                handle: {
                  headerIcon: {
                    leftIcon: 'profile',
                  },
                },
              },
              {
                path: ':spaceCode/work-list',
                element: <SuspenseWrapper element={<GuestWorkListPage />} />,
                handle: {
                  headerIcon: {
                    leftIcon: 'profile',
                  },
                },
              },
              {
                path: '',
                element: <GuestbookAccessGuard />,
                handle: {
                  headerIcon: {
                    leftIcon: 'profile',
                  },
                },
                children: [
                  {
                    path: ':spaceCode/guestbook',
                    element: (
                      <SuspenseWrapper element={<GuestGuestbookListPage />} />
                    ),
                    handle: {
                      headerIcon: {
                        leftIcon: 'profile',
                      },
                    },
                  },
                  {
                    path: ':spaceCode/guestbook/:guestbookCardId',
                    element: (
                      <SuspenseWrapper element={<GuestGuestbookCardPage />} />
                    ),
                    handle: {
                      headerIcon: {
                        leftIcon: 'profile',
                      },
                    },
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        path: '*',
        element: <SuspenseWrapper element={<NotFound />} />,
        handle: {
          noHamburger: true,
          noFooter: true,
          headerIcon: {
            leftIcon: 'logo',
          },
        },
      },
    ],
  },
];

const router = createBrowserRouter(routes);

export default router;
