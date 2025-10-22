import { Outlet, useParams } from 'react-router-dom';
import { SpaceInfoProvider } from '../../../contexts/SpaceInfoContext';

const SpaceInfoLayout = () => {
  const { spaceCode } = useParams();
  if (!spaceCode) {
    throw new Error('파라미터에 spaceCode가 없습니다');
  }

  return (
    <SpaceInfoProvider spaceCode={spaceCode}>
      <Outlet />
    </SpaceInfoProvider>
  );
};

export default SpaceInfoLayout;
