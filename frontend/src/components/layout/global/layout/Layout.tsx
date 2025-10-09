import { Activity, useState } from 'react';
import { IoSettingsSharp, IoShareOutline } from 'react-icons/io5';
import { Outlet, useMatches } from 'react-router-dom';
import type { AppRouteObject } from '../../../../types/route.type';
import Header from '../../../@common/header/Header';
import SpaceShareModal from '../../../specific/modal/spaceShareModal/SpaceShareModal';
import * as S from './Layout.styles';

const Layout = () => {
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
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
      onClick: () => console.log('Settings clicked'),
    },
  };

  const matches = useMatches() as AppRouteObject[];
  const current = matches[matches.length - 1];
  const isDarkPage = current?.handle?.highlight;
  const matchedIcons = current?.handle?.headerIcons?.map(
    (icon: keyof typeof headerIcons) => headerIcons[icon],
  );
  const isNoHeader = current?.handle?.noHeader;

  return (
    <>
      <Activity mode={isNoHeader ? 'hidden' : 'visible'}>
        <Header mode={isDarkPage ? 'dark' : 'light'} icons={matchedIcons} />
      </Activity>
      <S.Container $isDarkPage={isDarkPage}>
        <SpaceShareModal isOpen={isShareModalOpen} onClose={closeShareModal} />
        <Outlet />
      </S.Container>
    </>
  );
};

export default Layout;
