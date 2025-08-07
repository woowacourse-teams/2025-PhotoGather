import { useLocation } from 'react-router-dom';

const useSpaceCodeFromPath = () => {
  const { pathname } = useLocation();

  const match = pathname.match(
    /^\/(manager|guest)\/(space-home|image-upload)\/([^/]+)$/,
  );

  const spaceId = match ? match[3] : null;

  return { spaceId };
};

export default useSpaceCodeFromPath;
