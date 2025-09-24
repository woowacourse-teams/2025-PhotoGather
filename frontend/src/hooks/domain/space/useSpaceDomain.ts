import useSpaceCodeFromPath from '../../useSpaceCodeFromPath';
import useSpaceInfo from '../../useSpaceInfo';
import useSpaceAccess from '../useSpaceAccess';

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
    spaceCode,
  };
};

export default useSpaceDomain;
