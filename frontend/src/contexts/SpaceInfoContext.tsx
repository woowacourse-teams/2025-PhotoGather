import { createContext } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { ROUTES } from '../constants/routes';
import useSpaceInfo from '../hooks/domain/space/useSpaceInfo';
import type { SpaceInfo } from '../types/domain/space.type';

interface SpaceInfoProviderProps {
  spaceCode: string;
  children: React.ReactNode;
}

export const SpaceInfoContext = createContext<SpaceInfo | null>(null);

export const SpaceInfoProvider = ({ children }: SpaceInfoProviderProps) => {
  const { spaceCode } = useParams();
  const { spaceInfo } = useSpaceInfo({ spaceCode: spaceCode ?? '' });

  if (!spaceInfo) {
    return <Navigate to={ROUTES.HOST.MAIN} />;
  }

  return (
    <SpaceInfoContext.Provider value={spaceInfo}>
      {children}
    </SpaceInfoContext.Provider>
  );
};
