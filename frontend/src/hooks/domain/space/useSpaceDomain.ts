import useSpaceAccess from './useSpaceAccess';
import useSpaceCodeFromPath from './useSpaceCodeFromPath';
import useSpaceInfo from './useSpaceInfo';

const useSpaceDomain = () => {
  const { spaceCode } = useSpaceCodeFromPath();
  const spaceInfoDomain = useSpaceInfo(spaceCode ?? '');
  const spaceAccessDomain = useSpaceAccess({
    spaceHostId: spaceInfoDomain.spaceInfo?.host.id,
    spaceType: spaceInfoDomain.spaceInfo?.type,
  });

  return {
    spaceInfoDomain,
    spaceAccessDomain,
  };
};

export default useSpaceDomain;
