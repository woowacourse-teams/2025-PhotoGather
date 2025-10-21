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
import Header from '../../../@common/header/Header';
import ScrollToTop from '../../../@common/scrollToTop/ScrollToTop';
import SpaceShareModal from '../../../specific/modal/spaceShareModal/SpaceShareModal';
import * as S from './Layout.styles';

const Layout = () => {
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const navigate = useNavigate();
  const { spaceCode } = useParams();
  const { spaceInfo } = useSpaceInfo({ spaceCode: spaceCode ?? '' });
  const { redirectToExternalBrowser } = useInAppRedirect();
  const path = useLocation().pathname;

  const openShareModal = () => {
    setIsShareModalOpen(true);
  };
  const closeShareModal = () => {
    setIsShareModalOpen(false);
  };

  const matches = useMatches() as AppRouteObject[];
  const current = matches[matches.length - 1];
  const isDarkPage = current?.handle?.highlight;
  const isNoHeader = current?.handle?.noHeader;
  const isNoFooter = current?.handle?.noFooter;

  const headerIcons: Record<string, IconAction> = {
    logo: {
      icon: <LogoSvg />,
      // TODO : 랜딩페이지로 변경 필요
      onClick: () => navigate(ROUTES.MAIN),
    },
    hamburger: {
      icon: <MdMenu />,
      onClick: () => console.log('hamburger clicked'),
    },
    profile: {
      icon: (
        <DisplayProfile
          src={buildOriginalImageUrl(spaceInfo.spacePhoto.path)}
          alt={spaceInfo.name}
        />
      ),
      onClick: () => {
        if (path.includes('/host/')) {
          navigate(createSpaceMainRoute(spaceCode ?? ''));
        } else if (path.includes('/guest/')) {
          navigate(createGuestMainRoute(spaceCode ?? ''));
        } else {
          navigate(createGuestMainRoute(spaceCode ?? ''));
        }
      },
    },
  };

  const leftIcon = headerIcons[current?.handle?.headerIcon?.leftIcon];

  //biome-ignore lint/correctness/useExhaustiveDependencies: 페이지 접속 시 처음 한 번만 실행
  useEffect(() => {
    redirectToExternalBrowser(window.location.href);
  }, []);

  return (
    <>
      <ScrollToTop />
      {!isNoHeader && (
        <Header
          mode={isDarkPage ? 'dark' : 'light'}
          leftIcon={{ icon: leftIcon?.icon, onClick: leftIcon?.onClick }}
          rightIcon={{ icon: <MdMenu />, onClick: openShareModal }}
        />
      )}
      <S.Container $isDarkPage={isDarkPage}>
        <SpaceShareModal isOpen={isShareModalOpen} onClose={closeShareModal} />
        <Outlet />
      </S.Container>
      {!isNoFooter && <Footer />}
    </>
  );
};

export default Layout;
