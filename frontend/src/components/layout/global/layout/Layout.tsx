import { useEffect, useState } from 'react';
import { MdMenu } from 'react-icons/md';
import {
  Outlet,
  useLocation,
  useMatches,
  useNavigate,
  useParams,
} from 'react-router-dom';
import LogoSvg from '../../../../@assets/logo/logo.svg?react';
import {
  createGuestMainRoute,
  createSpaceMainRoute,
  ROUTES,
} from '../../../../constants/routes';
import useInAppRedirect from '../../../../hooks/@common/useInAppRedirect';
import useSpaceInfo from '../../../../hooks/domain/space/useSpaceInfo';
import type { AppRouteObject, IconAction } from '../../../../types/route.type';
import { buildOriginalImageUrl } from '../../../../utils/buildImageUrl';
import DisplayProfile from '../../../@common/displayProfile/DisplayProfile';
import Footer from '../../../@common/footer/Footer';
import Hamburger from '../../../@common/hamburger/Hamburger';
import Header from '../../../@common/header/Header';
import ScrollToTop from '../../../@common/scrollToTop/ScrollToTop';
import * as S from './Layout.styles';
import { guestNavigateInfo, hostNavigateInfo } from './navigateInfo';

const Layout = () => {
  const [isHamburgerOpen, setIsHamburgerOpen] = useState(false);

  const navigate = useNavigate();
  const { spaceCode } = useParams();
  const { spaceInfo } = useSpaceInfo({ spaceCode: spaceCode ?? '' });
  const { redirectToExternalBrowser } = useInAppRedirect();
  const path = useLocation().pathname;

  const openHamburger = () => {
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

  const isHost = path.includes('/host/');
  const isGuest = path.includes('/guest/');

  const leftHeaderIcons: Record<string, IconAction> = {
    logo: {
      icon: <LogoSvg />,
      // TODO : 랜딩페이지로 변경 필요
      onClick: () => navigate(ROUTES.MAIN),
    },
    profile: {
      icon: (
        <DisplayProfile
          src={buildOriginalImageUrl(spaceInfo.spacePhoto.path)}
          alt={spaceInfo.name}
        />
      ),
      onClick: () => {
        if (isHost) {
          navigate(createSpaceMainRoute(spaceCode ?? ''));
          return;
        }
        if (isGuest) {
          navigate(createGuestMainRoute(spaceCode ?? ''));
          return;
        }
        navigate(ROUTES.MAIN);
      },
    },
  };

  const leftIcon = leftHeaderIcons[current?.handle?.headerIcon?.leftIcon];

  //biome-ignore lint/correctness/useExhaustiveDependencies: 페이지 접속 시 처음 한 번만 실행
  useEffect(() => {
    redirectToExternalBrowser(window.location.href);
  }, []);

  return (
    <>
      <Hamburger
        isOpen={isHamburgerOpen}
        onClose={closeHamburger}
        navigateInfo={
          isHost
            ? hostNavigateInfo(spaceCode ?? '')
            : guestNavigateInfo(spaceCode ?? '')
        }
      />
      <ScrollToTop />
      {!isNoHeader && (
        <Header
          mode={isDarkPage ? 'dark' : 'light'}
          leftIcon={{ icon: leftIcon?.icon, onClick: leftIcon?.onClick }}
          rightIcon={{ icon: <MdMenu />, onClick: openHamburger }}
        />
      )}
      <S.Container $isDarkPage={isDarkPage}>
        <Outlet />
      </S.Container>
      {!isNoFooter && <Footer />}
    </>
  );
};

export default Layout;
