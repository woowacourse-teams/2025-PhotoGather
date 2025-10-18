import { useEffect, useState } from 'react';
import { IoSettingsSharp, IoShareOutline } from 'react-icons/io5';
import { Outlet, useMatches, useNavigate, useParams } from 'react-router-dom';
import { authService } from '../../../../apis/services/auth/auth.service';
import { AUTH_COOKIES } from '../../../../constants/cookie';
import { createSpaceInfoRoute, ROUTES } from '../../../../constants/routes';
import type { AppRouteObject } from '../../../../types/route.type';
import { CookieUtils } from '../../../../utils/cookie';
import Footer from '../../../@common/footer/Footer';
import Header from '../../../@common/header/Header';
import ScrollToTop from '../../../@common/scrollToTop/ScrollToTop';
import SpaceShareModal from '../../../specific/modal/spaceShareModal/SpaceShareModal';
import * as S from './Layout.styles';

const Layout = () => {
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const navigate = useNavigate();
  const { spaceCode } = useParams();

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
  };

  const matches = useMatches() as AppRouteObject[];
  const current = matches[matches.length - 1];
  const isDarkPage = current?.handle?.highlight;
  const matchedIcons = current?.handle?.headerIcons?.map(
    (icon: keyof typeof headerIcons) => headerIcons[icon],
  );
  const isNoHeader = current?.handle?.noHeader;
  const isNoFooter = current?.handle?.noFooter;

  useEffect(() => {
    const token = CookieUtils.get(AUTH_COOKIES.ACCESS);
    console.log(token);
    if (token) {
      authService.getUserInfo(token).then((response) => {
        console.log(response);
      });
    }
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
