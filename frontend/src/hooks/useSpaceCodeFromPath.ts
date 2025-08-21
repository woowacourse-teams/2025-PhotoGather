import { useLocation } from 'react-router-dom';

const useSpaceCodeFromPath = () => {
  const { pathname } = useLocation();

  const match = pathname.match(
    /^\/(manager|guest)\/(space-home|image-upload)\/([^/]+)/,
  );

  const spaceCode = match ? match[3] : null;

  return { spaceCode };
};

export default useSpaceCodeFromPath;
