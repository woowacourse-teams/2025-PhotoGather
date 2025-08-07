import { useLocation } from 'react-router-dom';

const useSpaceCodeFromPath = () => {
  const { pathname } = useLocation();

  const match = pathname.match(/^\/(?:upload|space)\/(\d+)$/);

  return match ? match[1] : null;
};

export default useSpaceCodeFromPath;
