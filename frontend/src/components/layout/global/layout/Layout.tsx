import { useState } from 'react';
import { MdOutlineIosShare, MdSettings } from 'react-icons/md';
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
      icon: <MdOutlineIosShare />,
      onClick: openShareModal,
    },
    settings: {
      icon: <MdSettings />,
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
        <SpaceShareModal isOpen={isShareModalOpen} onClose={closeShareModal} />
        <Outlet />
      </S.Container>
    </>
  );
};

export default Layout;
