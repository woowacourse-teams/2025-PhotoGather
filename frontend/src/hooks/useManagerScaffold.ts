import { useContext } from 'react';
import { ManagerScaffoldContext } from '../contexts/ManagerScaffoldContext';

const useManagerScaffold = () => {
  const context = useContext(ManagerScaffoldContext);
  if (!context) {
    throw new Error(
      'useManagerScaffold 훅은 ManagerScaffoldProvider 내에서만 사용할 수 있습니다.',
    );
  }
  return context;
};

export default useManagerScaffold;
