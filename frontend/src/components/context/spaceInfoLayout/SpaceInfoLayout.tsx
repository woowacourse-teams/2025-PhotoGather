import { Outlet } from 'react-router-dom';
import { SpaceInfoProvider } from '../../../contexts/SpaceInfoContext';

const SpaceInfoLayout = () => {
  return (
    <SpaceInfoProvider>
      <Outlet />
    </SpaceInfoProvider>
  );
};

export default SpaceInfoLayout;
