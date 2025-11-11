import { createBrowserRouter } from 'react-router-dom';
import { PrivateRoute } from '../components/context/privateRoute/PrivateRoute';
import SpaceInfoLayout from '../components/context/spaceInfoLayout/SpaceInfoLayout';
import Layout from '../components/layout/global/layout/Layout';
import GuestbookAccessGuard from '../components/layout/guestbookAccessGuard/GuestbookAccessGuard';
import HostPageAccessGuard from '../components/layout/hostPageAccessGuard/HostPageAccessGuard';
import KakaoAuthPage from '../pages/auth/KakaoAuthPage';
import CompletePage from '../pages/guest/completePage/CompletePage';
import GuestGuestbookCardPage from '../pages/guest/guestbookPage/card/GuestGuestbookCardPage';
import GuestBookFunnel from '../pages/guest/guestbookPage/funnel/GuestbookFunnel';
import GuestGuestbookListPage from '../pages/guest/guestbookPage/list/GuestGuestbookListPage';
import GuestSpaceHomePage from '../pages/guest/spaceHomePage/GuestMainPage';
import GuestWorkDetail from '../pages/guest/workDetail/GuestWorkDetail';
import GuestbookCardPage from '../pages/host/guestbook/card/GuestbookCardPage';
import GuestbookListPage from '../pages/host/guestbook/list/GuestbookListPage';
import MainPage from '../pages/host/mainPage/MainPage';
import MyPage from '../pages/host/mypage/MyPage';
import SharePage from '../pages/host/share/SharePage';
import SpaceCreateFunnel from '../pages/host/spaceCreate/funnel/SpaceCreateFunnel';
import SpaceEditPage from '../pages/host/spaceEditPage/SpaceEditPage';
import HostSpaceHomePage from '../pages/host/spaceHomePage/HostSpaceHomePage';
import SpaceInfoPage from '../pages/host/spaceInfoPage/SpaceInfoPage';
import HostWorkDetail from '../pages/host/workDetail/HostWorkDetail';
import WorkForm from '../pages/host/workForm/WorkForm';
import InAppRedirectPage from '../pages/inapp/InAppRedirectPage';
import LandingPage from '../pages/landing/LandingPage';
import LoginPage from '../pages/login/LoginPage';
import NotFound from '../pages/notFound/NotFound';
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
          noHamburger: true,
          highlight: true,
          headerIcon: {
            leftIcon: 'logo',
          },
        },
      },
      {
        path: '/login',
        element: <LoginPage />,
        handle: {
          noHamburger: true,
          headerIcon: {
            leftIcon: 'logo',
          },
        },
      },
      {
        path: '/inapp',
        element: <InAppRedirectPage />,
      },
      {
        path: '/auth/login/kakao',
        element: <KakaoAuthPage />,
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
                element: <MainPage />,
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
                        element: <HostSpaceHomePage />,
                        handle: {
                          // TODO : default를 logo와 hamburger로 변경 필요
                          headerIcon: {
                            leftIcon: 'logo',
                          },
                        },
                      },
                      {
                        path: ':spaceCode/space-info',
                        element: <SpaceInfoPage />,
                        handle: {
                          headerIcon: {
                            leftIcon: 'profile',
                          },
                        },
                      },
                      {
                        path: ':spaceCode/space-info/edit',
                        element: <SpaceEditPage />,
                        handle: {
                          headerIcon: {
                            leftIcon: 'profile',
                          },
                        },
                      },
                      {
                        path: ':spaceCode/work-detail',
                        element: <HostWorkDetail />,
                        handle: {
                          headerIcon: {
                            leftIcon: 'profile',
                          },
                        },
                      },
                      {
                        path: ':spaceCode/work-detail/edit',
                        element: <WorkForm />,
                        handle: {
                          noFooter: true,
                          headerIcon: {
                            leftIcon: 'profile',
                          },
                        },
                      },
                      {
                        path: ':spaceCode/guestbook',
                        element: <GuestbookListPage />,
                        handle: {
                          headerIcon: {
                            leftIcon: 'profile',
                          },
                        },
                      },
                      {
                        path: ':spaceCode/guestbook/:guestbookCardId',
                        element: <GuestbookCardPage />,
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
                element: <MyPage />,
                handle: {
                  headerIcon: {
                    leftIcon: 'logo',
                  },
                },
              },
              {
                path: 'create-space',
                element: <SpaceCreateFunnel />,
                handle: {
                  noFooter: true,
                  headerIcon: {
                    leftIcon: 'back',
                  },
                },
              },

              {
                path: 'share',
                element: <SharePage />,
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
                element: <GuestSpaceHomePage />,
                handle: {
                  headerIcon: {
                    leftIcon: 'profile',
                  },
                },
              },
              {
                path: ':spaceCode/create-guestbook',
                element: <GuestBookFunnel />,
                handle: {
                  noFooter: true,
                  headerIcon: {
                    leftIcon: 'profile',
                  },
                },
              },
              {
                path: ':spaceCode/create-guestbook-complete',
                element: <CompletePage />,
                handle: {
                  headerIcon: {
                    leftIcon: 'profile',
                  },
                },
              },
              {
                path: ':spaceCode/work-detail',
                element: <GuestWorkDetail />,
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
                    element: <GuestGuestbookListPage />,
                    handle: {
                      headerIcon: {
                        leftIcon: 'profile',
                      },
                    },
                  },
                  {
                    path: ':spaceCode/guestbook/:guestbookCardId',
                    element: <GuestGuestbookCardPage />,
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
        element: <NotFound />,
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
