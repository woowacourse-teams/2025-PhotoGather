import { createContext } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { ROUTES } from '../constants/routes';
import useSpaceInfo from '../hooks/domain/space/useSpaceInfo';
import type { SpaceInfoContextType } from '../types/context.type';

interface SpaceInfoProviderProps {
  children: React.ReactNode;
}

export const SpaceInfoContext = createContext<SpaceInfoContextType | null>(
  null,
);

export const SpaceInfoProvider = ({ children }: SpaceInfoProviderProps) => {
  const { spaceCode } = useParams();
  const { spaceInfo, isLoading, isError } = useSpaceInfo({
    spaceCode: spaceCode ?? '',
  });

  if (!spaceInfo && !isLoading) {
    return <Navigate to={ROUTES.HOST.MAIN} replace />;
  }

  return (
    <SpaceInfoContext.Provider value={{ spaceInfo, isLoading, isError }}>
      {children}
    </SpaceInfoContext.Provider>
  );
};
