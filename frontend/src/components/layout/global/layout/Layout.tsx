import { useEffect, useState } from 'react';
import { MdChevronLeft, MdHome, MdMenu } from 'react-icons/md';
import {
  Outlet,
  useLocation,
  useMatches,
  useNavigate,
  useParams,
} from 'react-router-dom';
import LogoSvg from '../../../../@assets/logo/logo.svg?react';
import {
  createGuestHomeRoute,
  createSpaceMainRoute,
  ROUTES,
} from '../../../../constants/routes';
import useButtonTracking from '../../../../hooks/@common/useButtonTracking';
import useInAppRedirect from '../../../../hooks/@common/useInAppRedirect';
import usePageTracking from '../../../../hooks/@common/usePageTracking';
import type { AppRouteObject, IconAction } from '../../../../types/route.type';
import Footer from '../../../@common/footer/Footer';
import Hamburger from '../../../@common/hamburger/Hamburger';
import Header from '../../../@common/header/Header';
import ScrollToTop from '../../../@common/scrollToTop/ScrollToTop';
import * as S from './Layout.styles';
import { guestNavigateInfo, hostNavigateInfo } from './navigateInfo';

const Layout = () => {
  const [isHamburgerOpen, setIsHamburgerOpen] = useState(false);

  usePageTracking();

  const navigate = useNavigate();
  const { spaceCode } = useParams();

  const { redirectToExternalBrowser } = useInAppRedirect();
  const path = useLocation().pathname;

  const isHost = path.includes('/host/');
  const isGuest = path.includes('/guest/');

  const { trackClick } = useButtonTracking({
    userType: isHost ? 'host' : isGuest ? 'guest' : undefined,
    spaceCode,
  });

  const openHamburger = () => {
    trackClick('header_hamburger_menu_open', {
      page: path,
    });
    setIsHamburgerOpen(true);
  };
  const closeHamburger = () => {
    setIsHamburgerOpen(false);
  };

  const matches = useMatches() as AppRouteObject[];
  const current = matches[matches.length - 1];
  const isDarkPage = current?.handle?.highlight;
  const isNoHeader = current?.handle?.noHeader;
  const isNoFooter = current?.handle?.noFooter;
  const isNoHamburger = current?.handle?.noHamburger;

  const leftHeaderIcons: Record<string, IconAction> = {
    logo: {
      icon: <LogoSvg />,
      onClick: () => {
        trackClick('header_logo_click', {
          page: path,
        });
        navigate(ROUTES.LANDING);
      },
    },
    profile: {
      icon: <MdHome size={24} />,
      onClick: () => {
        trackClick('header_home_icon_click', {
          page: path,
        });
        if (isHost) {
          navigate(createSpaceMainRoute(spaceCode ?? ''));
          return;
        }
        if (isGuest) {
          navigate(createGuestHomeRoute(spaceCode ?? ''));
          return;
        }
        navigate(ROUTES.LANDING);
      },
    },
    back: {
      icon: <MdChevronLeft size={32} />,
      onClick: () => navigate(-1),
    },
  };

  const leftIcon = leftHeaderIcons[current?.handle?.headerIcon?.leftIcon];

  //biome-ignore lint/correctness/useExhaustiveDependencies: 페이지 접속 시 처음 한 번만 실행
  useEffect(() => {
    redirectToExternalBrowser(window.location.href);
  }, []);

  return (
    <>
      {!isNoHamburger && (
        <Hamburger
          isOpen={isHamburgerOpen}
          onClose={closeHamburger}
          navigateInfo={
            isHost ? hostNavigateInfo() : guestNavigateInfo(spaceCode ?? '')
          }
        />
      )}
      <ScrollToTop />
      {!isNoHeader && (
        <Header
          mode={isDarkPage ? 'dark' : 'light'}
          leftIcon={{ icon: leftIcon?.icon, onClick: leftIcon?.onClick }}
          rightIcon={{
            icon: <MdMenu />,
            onClick: openHamburger,
            disabled: isNoHamburger,
          }}
        />
      )}
      <S.Container $isDarkPage={isDarkPage}>
        <Outlet />
      </S.Container>
      {!isNoFooter && <Footer mode={isDarkPage ? 'dark' : 'light'} />}
    </>
  );
};

export default Layout;
