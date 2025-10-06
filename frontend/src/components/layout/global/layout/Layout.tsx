import { useState } from 'react';
import { IoSettingsSharp, IoShareOutline } from 'react-icons/io5';
import { Outlet, useMatches } from 'react-router-dom';
import type { AppRouteObject } from '../../../../types/route.type';
import Header from '../../../@common/header/Header';
import ShareModal from '../../../@common/modal/shareModal/ShareModal';
import * as S from './Layout.styles';

const Layout = () => {
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const openShareModal = () => {
    setIsShareModalOpen(true);
    console.log('작동');
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
      onClick: () => console.log('Settings clicked'),
    },
  };

  const matches = useMatches() as AppRouteObject[];
  const current = matches[matches.length - 1];
  const isDarkPage = current?.handle?.highlight;
  const matchedIcons = current?.handle?.headerIcons.map(
    (icon: keyof typeof headerIcons) => headerIcons[icon],
  );

  return (
    <>
      <Header mode={isDarkPage ? 'dark' : 'light'} icons={matchedIcons} />
      <S.Container $isDarkPage={isDarkPage}>
        <ShareModal isOpen={isShareModalOpen} onClose={closeShareModal} />
        <Outlet />
      </S.Container>
    </>
  );
};

export default Layout;
