import { Outlet, useParams } from 'react-router-dom';
import { SpaceInfoProvider } from '../../../contexts/SpaceInfoContext';

const SpaceInfoLayout = () => {
  const { spaceCode } = useParams();

  return (
    <SpaceInfoProvider spaceCode={spaceCode ?? ''}>
      <Outlet />
    </SpaceInfoProvider>
  );
};

export default SpaceInfoLayout;
