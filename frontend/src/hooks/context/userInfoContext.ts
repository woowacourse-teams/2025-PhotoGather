import { useContext } from 'react';
import { UserContext } from '../../contexts/UserContext';

const useUserInfoContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('UserContext 하위에서 사용해야 합니다.');
  }
  return context;
};

export default useUserInfoContext;
