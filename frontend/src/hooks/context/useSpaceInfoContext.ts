import { useContext } from 'react';
import { SpaceInfoContext } from '../../contexts/SpaceInfoContext';

const useSpaceInfoContext = () => {
  const context = useContext(SpaceInfoContext);
  if (!context) {
    throw new Error('SpaceInfoContext 하위에서 사용해야 합니다.');
  }
  return context;
};

export default useSpaceInfoContext;
