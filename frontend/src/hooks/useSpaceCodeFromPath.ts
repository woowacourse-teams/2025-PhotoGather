import { useLocation } from 'react-router-dom';

const useSpaceCodeFromPath = () => {
  const { pathname } = useLocation();

  const match = pathname.match(/^\/(upload|space)\/([^/]+)/);

  const spaceCode = match ? match[2] : null;

  return { spaceCode };
};

export default useSpaceCodeFromPath;
