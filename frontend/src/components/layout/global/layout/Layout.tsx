import { useEffect, useState } from 'react';
import { IoSettingsSharp, IoShareOutline } from 'react-icons/io5';
import { MdPerson } from 'react-icons/md';
import { Outlet, useMatches, useNavigate, useParams } from 'react-router-dom';
import { createSpaceInfoRoute, ROUTES } from '../../../../constants/routes';
import useInAppRedirect from '../../../../hooks/@common/useInAppRedirect';
import usePageTracking from '../../../../hooks/@common/usePageTracking';
import type { AppRouteObject } from '../../../../types/route.type';
import Footer from '../../../@common/footer/Footer';
import Header from '../../../@common/header/Header';
import ScrollToTop from '../../../@common/scrollToTop/ScrollToTop';
import SpaceShareModal from '../../../specific/modal/spaceShareModal/SpaceShareModal';
import * as S from './Layout.styles';

const Layout = () => {
  usePageTracking();
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const navigate = useNavigate();
  const { spaceCode } = useParams();
  const { redirectToExternalBrowser } = useInAppRedirect();

  const openShareModal = () => {
    setIsShareModalOpen(true);
  };
  const closeShareModal = () => {
    setIsShareModalOpen(false);
  };

  const headerIcons = {
    share: {
      icon: <IoShareOutline />,
      onClick: openShareModal,
    },
    settings: {
      icon: <IoSettingsSharp />,
      onClick: () => navigate(createSpaceInfoRoute(spaceCode ?? '')),
    },
    user: {
      icon: <MdPerson />,
      onClick: () => navigate(ROUTES.HOST.MY_INFO),
    },
  };

  const matches = useMatches() as AppRouteObject[];
  const current = matches[matches.length - 1];
  const isDarkPage = current?.handle?.highlight;
  const matchedIcons = current?.handle?.headerIcons?.map(
    (icon: keyof typeof headerIcons) => headerIcons[icon],
  );
  const isNoHeader = current?.handle?.noHeader;
  const isNoFooter = current?.handle?.noFooter;

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
          icons={matchedIcons}
          onLogoClick={() => navigate(ROUTES.MAIN)}
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
